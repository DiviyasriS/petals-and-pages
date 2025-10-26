import React, { useState, useEffect } from 'react';
import { ShoppingCart, Book, Flower2, User, Heart, Search, Menu, X } from 'lucide-react';

const PetalsAndPages = () => {
  const [activeTab, setActiveTab] = useState('flowers');
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState({
    flowers: [
      { id: 1, name: 'Rose Bouquet', price: 45, image: '🌹', description: 'Classic red roses', category: 'flowers' },
      { id: 2, name: 'Tulip Collection', price: 35, image: '🌷', description: 'Spring tulips mix', category: 'flowers' },
      { id: 3, name: 'Orchid Elegance', price: 55, image: '🌸', description: 'Exotic orchids', category: 'flowers' },
      { id: 4, name: 'Sunflower Joy', price: 30, image: '🌻', description: 'Bright sunflowers', category: 'flowers' },
      { id: 5, name: 'Lily Paradise', price: 40, image: '🌺', description: 'Fragrant lilies', category: 'flowers' },
      { id: 6, name: 'Mixed Bouquet', price: 50, image: '💐', description: 'Seasonal mix', category: 'flowers' }
    ],
    books: [
      { id: 7, name: 'The Great Garden', price: 25, image: '📗', description: 'Nature & Life', category: 'books' },
      { id: 8, name: 'Poetry in Bloom', price: 20, image: '📘', description: 'Modern poetry', category: 'books' },
      { id: 9, name: 'The Flower Code', price: 30, image: '📙', description: 'Mystery novel', category: 'books' },
      { id: 10, name: 'Botanical Dreams', price: 35, image: '📕', description: 'Art & Nature', category: 'books' },
      { id: 11, name: 'Garden Tales', price: 22, image: '📔', description: 'Short stories', category: 'books' },
      { id: 12, name: 'Floral Cookbook', price: 28, image: '📓', description: 'Recipes', category: 'books' }
    ]
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products[activeTab].filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Flower2 className="text-pink-500" size={32} />
                <Book className="text-amber-600" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-amber-600 bg-clip-text text-transparent">
                  Petals & Pages
                </h1>
                <p className="text-xs text-gray-500">Where stories bloom</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-pink-500 transition">
                <User size={20} />
                <span className="text-sm">Account</span>
              </button>
              <button 
                onClick={() => setShowCart(!showCart)}
                className="flex items-center space-x-2 text-gray-700 hover:text-pink-500 transition relative"
              >
                <ShoppingCart size={20} />
                <span className="text-sm">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenu && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4">
              <button className="flex items-center space-x-2 text-gray-700 mb-3 w-full">
                <User size={20} />
                <span>Account</span>
              </button>
              <button 
                onClick={() => { setShowCart(!showCart); setMobileMenu(false); }}
                className="flex items-center space-x-2 text-gray-700 w-full"
              >
                <ShoppingCart size={20} />
                <span>Cart ({cartCount})</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-100 to-amber-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Discover Beauty in Every Page & Petal
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Curated collections of fresh flowers and inspiring books
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search flowers or books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-full border-2 border-pink-200 focus:border-pink-400 focus:outline-none"
            />
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('flowers')}
            className={`px-8 py-3 rounded-full font-medium transition-all ${
              activeTab === 'flowers'
                ? 'bg-pink-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-pink-50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Flower2 size={20} />
              <span>Flowers</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('books')}
            className={`px-8 py-3 rounded-full font-medium transition-all ${
              activeTab === 'books'
                ? 'bg-amber-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-amber-50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Book size={20} />
              <span>Books</span>
            </div>
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div 
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 transform hover:-translate-y-1"
            >
              <div className="text-6xl mb-4 text-center">{product.image}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-pink-500">${product.price}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-gradient-to-r from-pink-500 to-amber-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching "{searchTerm}"</p>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowCart(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
                <button onClick={() => setShowCart(false)}>
                  <X size={24} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                        <div className="text-3xl">{item.image}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                          <p className="text-sm text-gray-600">${item.price} each</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-4">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-pink-500">${totalPrice.toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-pink-500 to-amber-500 text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Flower2 className="text-pink-400" size={24} />
            <Book className="text-amber-400" size={24} />
          </div>
          <h3 className="text-2xl font-bold mb-2">Petals & Pages</h3>
          <p className="text-gray-400 mb-4">Microservices DevOps Project</p>
          <p className="text-sm text-gray-500">© 2025 Built with ❤️ using Docker, Kubernetes & Jenkins</p>
        </div>
      </footer>
    </div>
  );
};

export default PetalsAndPages;// Wishlist feature
