import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [likedItems, setLikedItems] = useState([]);
  const [biddedItems, setBiddedItems] = useState([]);

  // Load liked items from localStorage on mount and when user changes
  useEffect(() => {
    if (user?.id) {
      const stored = localStorage.getItem(`wishlist_${user.id}`);
      if (stored) {
        try {
          setLikedItems(JSON.parse(stored));
        } catch (e) {
          console.error('Error parsing wishlist:', e);
          setLikedItems([]);
        }
      } else {
        setLikedItems([]);
      }

      // Load bidded items
      const bidded = localStorage.getItem(`bidded_${user.id}`);
      if (bidded) {
        try {
          setBiddedItems(JSON.parse(bidded));
        } catch (e) {
          console.error('Error parsing bidded items:', e);
          setBiddedItems([]);
        }
      } else {
        setBiddedItems([]);
      }
    } else {
      setLikedItems([]);
      setBiddedItems([]);
    }
  }, [user?.id]);

  const addToLiked = (product) => {
    if (!user?.id) return false;
    
    const productId = product._id || product.id;
    if (!productId) return false;

    setLikedItems((prev) => {
      // Check if already liked
      if (prev.some((item) => (item._id || item.id) === productId)) {
        return prev;
      }
      
      const updated = [...prev, product];
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(updated));
      return updated;
    });
    return true;
  };

  const removeFromLiked = (productId) => {
    if (!user?.id) return;
    
    setLikedItems((prev) => {
      const updated = prev.filter((item) => (item._id || item.id) !== productId);
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(updated));
      return updated;
    });
  };

  const toggleLike = (product) => {
    const productId = product._id || product.id;
    if (isLiked(productId)) {
      removeFromLiked(productId);
      return false;
    } else {
      addToLiked(product);
      return true;
    }
  };

  const isLiked = (productId) => {
    return likedItems.some((item) => (item._id || item.id) === productId);
  };

  const addToBidded = (product) => {
    if (!user?.id) return;
    
    const productId = product._id || product.id;
    if (!productId) return;

    // Remove from liked if it was liked
    removeFromLiked(productId);

    setBiddedItems((prev) => {
      // Check if already bidded
      if (prev.some((item) => (item._id || item.id) === productId)) {
        return prev;
      }
      
      const updated = [...prev, product];
      localStorage.setItem(`bidded_${user.id}`, JSON.stringify(updated));
      return updated;
    });
  };

  const clearWishlist = () => {
    if (!user?.id) return;
    setLikedItems([]);
    localStorage.removeItem(`wishlist_${user.id}`);
  };

  return (
    <WishlistContext.Provider
      value={{
        likedItems,
        biddedItems,
        addToLiked,
        removeFromLiked,
        toggleLike,
        isLiked,
        addToBidded,
        clearWishlist,
        likedCount: likedItems.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

