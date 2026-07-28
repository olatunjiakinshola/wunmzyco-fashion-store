import BrownHoodie from "../assets/products/BrownHoodie.JPG";
import BlackGown from "../assets/products/BlackGown.JPG";
import BlueGown from "../assets/products/BlueGown.JPG";
import BlackGownn from "../assets/products/BlackGownn.JPG";
import BlueGownn from "../assets/products/BlueGownn.JPG";

const products = [
  // ===== TOPS (11) =====
  { id: 1, name: "Brown Oversized Hoodie", price: 35000, category: "tops", image: BrownHoodie, color: "Brown", sizes: ["M", "L", "XL"], description: "Premium oversized hoodie.", stock: 15, featured: true },
  { id: 2, name: "Black Casual Top", price: 12000, category: "tops", image: BlackGown, color: "Black", sizes: ["S", "M", "L"], description: "Stylish black top.", stock: 25, featured: false },
  { id: 3, name: "Blue Soft Top", price: 15000, category: "tops", image: BlueGown, color: "Blue", sizes: ["M", "L"], description: "Comfortable blue top.", stock: 20, featured: true },
  { id: 4, name: "Dark Black Top", price: 18000, category: "tops", image: BlackGownn, color: "Black", sizes: ["S", "M", "L", "XL"], description: "Premium black top.", stock: 18, featured: false },
  { id: 5, name: "Light Blue Top", price: 16000, category: "tops", image: BlueGownn, color: "Blue", sizes: ["M", "L", "XL"], description: "Elegant light blue top.", stock: 22, featured: true },
  { id: 6, name: "Brown Classic Hoodie", price: 32000, category: "tops", image: BrownHoodie, color: "Brown", sizes: ["L", "XL"], description: "Warm classic hoodie.", stock: 14, featured: false },
  { id: 7, name: "Black Slim Top", price: 11000, category: "tops", image: BlackGown, color: "Black", sizes: ["S", "M"], description: "Slim fit black top.", stock: 30, featured: true },
  { id: 8, name: "Blue Everyday Top", price: 13500, category: "tops", image: BlueGown, color: "Blue", sizes: ["M", "L"], description: "Everyday blue top.", stock: 28, featured: false },
  { id: 9, name: "Black Premium Top", price: 21000, category: "tops", image: BlackGownn, color: "Black", sizes: ["M", "L", "XL"], description: "Premium quality top.", stock: 16, featured: true },
  { id: 10, name: "Blue Soft Hoodie", price: 29000, category: "tops", image: BlueGownn, color: "Blue", sizes: ["L", "XL"], description: "Soft blue hoodie.", stock: 12, featured: false },
  { id: 11, name: "Brown Street Hoodie", price: 4999, category: "tops", image: BrownHoodie, color: "Brown", sizes: ["M", "L", "XL"], description: "Street style hoodie.", stock: 10, featured: true },

  // ===== GOWNS (11) =====
  { id: 12, name: "Black Oversized Gown", price: 10000, category: "gowns", image: BlackGown, color: "Black", sizes: ["M", "L", "XL"], description: "Elegant black gown.", stock: 15, featured: true },
  { id: 13, name: "Blue Oversized Gown", price: 20000, category: "gowns", image: BlueGown, color: "Blue", sizes: ["M", "L", "XL"], description: "Beautiful blue gown.", stock: 18, featured: true },
  { id: 14, name: "Black Classic Gown", price: 25000, category: "gowns", image: BlackGownn, color: "Black", sizes: ["S", "M", "L"], description: "Classic black gown.", stock: 20, featured: false },
  { id: 15, name: "Blue Flowing Gown", price: 50000, category: "gowns", image: BlueGownn, color: "Blue", sizes: ["M", "L"], description: "Premium flowing gown.", stock: 8, featured: true },
  { id: 16, name: "Brown Style Gown", price: 28000, category: "gowns", image: BrownHoodie, color: "Brown", sizes: ["L", "XL"], description: "Unique brown gown style.", stock: 12, featured: false },
  { id: 17, name: "Black Evening Gown", price: 45000, category: "gowns", image: BlackGown, color: "Black", sizes: ["S", "M", "L"], description: "Perfect for evening events.", stock: 10, featured: true },
  { id: 18, name: "Blue Party Gown", price: 38000, category: "gowns", image: BlueGown, color: "Blue", sizes: ["M", "L", "XL"], description: "Stylish party gown.", stock: 14, featured: true },
  { id: 19, name: "Black Long Gown", price: 32000, category: "gowns", image: BlackGownn, color: "Black", sizes: ["M", "L"], description: "Long elegant gown.", stock: 16, featured: false },
  { id: 20, name: "Blue Soft Gown", price: 27000, category: "gowns", image: BlueGownn, color: "Blue", sizes: ["S", "M", "L"], description: "Soft and comfortable gown.", stock: 19, featured: true },
  { id: 21, name: "Brown Casual Gown", price: 22000, category: "gowns", image: BrownHoodie, color: "Brown", sizes: ["M", "L", "XL"], description: "Casual brown gown.", stock: 13, featured: false },
  { id: 22, name: "Black Luxury Gown", price: 4999, category: "gowns", image: BlackGown, color: "Black", sizes: ["M", "L"], description: "Luxury black gown.", stock: 7, featured: true },

  // ===== SKIRTS (8) =====
  { id: 23, name: "Black Midi Skirt", price: 18000, category: "skirts", image: BlackGown, color: "Black", sizes: ["S", "M", "L"], description: "Elegant black midi skirt.", stock: 22, featured: true },
  { id: 24, name: "Blue Flare Skirt", price: 15000, category: "skirts", image: BlueGown, color: "Blue", sizes: ["M", "L"], description: "Beautiful blue flare skirt.", stock: 18, featured: false },
  { id: 25, name: "Black Pencil Skirt", price: 16000, category: "skirts", image: BlackGownn, color: "Black", sizes: ["S", "M", "L"], description: "Classic pencil skirt.", stock: 25, featured: true },
  { id: 26, name: "Blue A-Line Skirt", price: 14000, category: "skirts", image: BlueGownn, color: "Blue", sizes: ["M", "L", "XL"], description: "Stylish A-line skirt.", stock: 20, featured: false },
  { id: 27, name: "Brown Casual Skirt", price: 12000, category: "skirts", image: BrownHoodie, color: "Brown", sizes: ["S", "M", "L"], description: "Comfortable casual skirt.", stock: 28, featured: true },
  { id: 28, name: "Black Mini Skirt", price: 11000, category: "skirts", image: BlackGown, color: "Black", sizes: ["S", "M"], description: "Trendy mini skirt.", stock: 30, featured: false },
  { id: 29, name: "Blue Long Skirt", price: 19000, category: "skirts", image: BlueGown, color: "Blue", sizes: ["M", "L"], description: "Elegant long skirt.", stock: 15, featured: true },
  { id: 30, name: "Black Soft Skirt", price: 4999, category: "skirts", image: BlackGownn, color: "Black", sizes: ["S", "M", "L"], description: "Soft black skirt.", stock: 24, featured: false },

  // ===== BUBU (7) =====
  { id: 31, name: "Black Comfortable Bubu", price: 25000, category: "bubu", image: BlackGown, color: "Black", sizes: ["Free Size"], description: "Loose and comfortable bubu.", stock: 20, featured: true },
  { id: 32, name: "Blue Soft Bubu", price: 28000, category: "bubu", image: BlueGown, color: "Blue", sizes: ["Free Size"], description: "Soft blue bubu dress.", stock: 18, featured: true },
  { id: 33, name: "Black Embroidered Bubu", price: 32000, category: "bubu", image: BlackGownn, color: "Black", sizes: ["Free Size"], description: "Elegant embroidered bubu.", stock: 12, featured: false },
  { id: 34, name: "Blue Flowing Bubu", price: 30000, category: "bubu", image: BlueGownn, color: "Blue", sizes: ["Free Size"], description: "Flowing blue bubu.", stock: 15, featured: true },
  { id: 35, name: "Brown Relaxed Bubu", price: 26000, category: "bubu", image: BrownHoodie, color: "Brown", sizes: ["Free Size"], description: "Relaxed brown bubu.", stock: 16, featured: false },
  { id: 36, name: "Black Simple Bubu", price: 23000, category: "bubu", image: BlackGown, color: "Black", sizes: ["Free Size"], description: "Simple and elegant bubu.", stock: 22, featured: true },
  { id: 37, name: "Blue Everyday Bubu", price: 4999, category: "bubu", image: BlueGown, color: "Blue", sizes: ["Free Size"], description: "Perfect for everyday wear.", stock: 19, featured: false },

  // ===== BAGGY (7) =====
  { id: 38, name: "Brown Baggy Hoodie", price: 34000, category: "baggy", image: BrownHoodie, color: "Brown", sizes: ["M", "L", "XL"], description: "Oversized baggy hoodie.", stock: 14, featured: true },
  { id: 39, name: "Black Baggy Top", price: 19000, category: "baggy", image: BlackGown, color: "Black", sizes: ["S", "M", "L"], description: "Loose black baggy top.", stock: 25, featured: false },
  { id: 40, name: "Blue Baggy Shirt", price: 21000, category: "baggy", image: BlueGown, color: "Blue", sizes: ["M", "L", "XL"], description: "Comfortable baggy shirt.", stock: 18, featured: true },
  { id: 41, name: "Black Oversized Baggy", price: 24000, category: "baggy", image: BlackGownn, color: "Black", sizes: ["L", "XL"], description: "Oversized baggy style.", stock: 16, featured: false },
  { id: 42, name: "Blue Loose Baggy", price: 20000, category: "baggy", image: BlueGownn, color: "Blue", sizes: ["M", "L"], description: "Loose fit baggy top.", stock: 20, featured: true },
  { id: 43, name: "Brown Street Baggy", price: 31000, category: "baggy", image: BrownHoodie, color: "Brown", sizes: ["M", "L", "XL"], description: "Street style baggy hoodie.", stock: 12, featured: true },
  { id: 44, name: "Black Casual Baggy", price: 4999, category: "baggy", image: BlackGown, color: "Black", sizes: ["S", "M", "L"], description: "Casual baggy top.", stock: 28, featured: false },
];

export default products;