import BrownHoodie from "../assets/products/BrownHoodie.JPG";
import BlackGown from "../assets/products/BlackGown.JPG";
import BlueGown from "../assets/products/BlueGown.JPG";
import BlackGownn from "../assets/products/BlackGownn.JPG";
import BlueGownn from "../assets/products/BlueGownn.JPG";
import btBlack1 from "../assets/products/btBlack1.jpeg";
import btBrown from "../assets/products/btBrown.jpeg";
import btBlack2 from "../assets/products/btBlack2.jpeg";
import btAsh from "../assets/products/btAsh.jpeg";


const products = [
  // ===== TOPS (11) =====
  { id: 1, name: "Black Basic Top", price: 5000, category: "tops", image: btBlack1, color: "Black", sizes: ["M", "L", "XL"], description: "Premium Black Top.", stock: 15, featured: true },
  { id: 2, name: "Brown Basic Top", price: 7000, category: "tops", image: btBrown, color: "Brown", sizes: ["S", "M", "L"], description: "Stylish brown top.", stock: 25, featured: false },
  { id: 3, name: "Black Basic Top", price: 5000, category: "tops", image: btBlack2, color: "Black", sizes: ["M", "L"], description: "Comfortable black top.", stock: 20, featured: true },
  { id: 4, name: "Basic Ash Top", price: 8000, category: "tops", image: btAsh, color: "Ash", sizes: ["S", "M", "L", "XL"], description: "Premium ash top.", stock: 18, featured: false },
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
   
  // ===== TWO PIECE (10) =====
  { id: 45, name: "Classic Two Piece Set", price: 28000, category: "twopiece", image: BlackGown, color: "Black", sizes: ["M", "L", "XL"], description: "Stylish two piece set for casual and semi-formal looks.", stock: 15, featured: true },
  { id: 46, name: "Blue Two Piece Outfit", price: 32000, category: "twopiece", image: BlueGown, color: "Blue", sizes: ["S", "M", "L"], description: "Comfortable and elegant blue two piece outfit.", stock: 12, featured: true },
  { id: 47, name: "Black Premium Two Piece", price: 35000, category: "twopiece", image: BlackGownn, color: "Black", sizes: ["M", "L", "XL"], description: "Premium quality two piece set.", stock: 10, featured: false },
  { id: 48, name: "Soft Blue Two Piece", price: 30000, category: "twopiece", image: BlueGownn, color: "Blue", sizes: ["S", "M", "L"], description: "Soft and breathable two piece set.", stock: 14, featured: true },
  { id: 49, name: "Brown Casual Two Piece", price: 27000, category: "twopiece", image: BrownHoodie, color: "Brown", sizes: ["M", "L", "XL"], description: "Casual brown two piece for everyday wear.", stock: 18, featured: false },
  { id: 70, name: "Black Relaxed Two Piece", price: 29000, category: "twopiece", image: BlackGown, color: "Black", sizes: ["S", "M", "L"], description: "Relaxed fit black two piece.", stock: 16, featured: true },
  { id: 71, name: "Blue Chic Two Piece", price: 33000, category: "twopiece", image: BlueGown, color: "Blue", sizes: ["M", "L", "XL"], description: "Chic blue two piece outfit.", stock: 11, featured: false },
  { id: 72, name: "Elegant Black Two Piece", price: 36000, category: "twopiece", image: BlackGownn, color: "Black", sizes: ["M", "L"], description: "Elegant black two piece for outings.", stock: 9, featured: true },
  { id: 73, name: "Light Blue Two Piece", price: 31000, category: "twopiece", image: BlueGownn, color: "Blue", sizes: ["S", "M", "L", "XL"], description: "Light blue comfortable two piece.", stock: 13, featured: true },
  { id: 74, name: "Brown Soft Two Piece", price: 26000, category: "twopiece", image: BrownHoodie, color: "Brown", sizes: ["M", "L", "XL"], description: "Soft brown two piece set.", stock: 17, featured: false },

  // ===== SLIPPERS (10) =====
  { id: 50, name: "Comfort Slippers", price: 8000, category: "slippers", image: BrownHoodie, color: "Brown", sizes: ["37", "38", "39", "40", "41"], description: "Soft and comfortable everyday slippers.", stock: 25, featured: true },
  { id: 51, name: "Black Home Slippers", price: 7500, category: "slippers", image: BlackGown, color: "Black", sizes: ["37", "38", "39", "40"], description: "Lightweight black slippers for home use.", stock: 30, featured: false },
  { id: 52, name: "Blue Casual Slippers", price: 8500, category: "slippers", image: BlueGown, color: "Blue", sizes: ["38", "39", "40", "41"], description: "Casual blue slippers with soft sole.", stock: 22, featured: true },
  { id: 53, name: "Premium Black Slippers", price: 9500, category: "slippers", image: BlackGownn, color: "Black", sizes: ["37", "38", "39", "40", "41"], description: "Premium comfortable slippers.", stock: 18, featured: true },
  { id: 54, name: "Soft Blue Slippers", price: 7800, category: "slippers", image: BlueGownn, color: "Blue", sizes: ["38", "39", "40"], description: "Soft blue slippers for daily comfort.", stock: 20, featured: false },
  { id: 75, name: "Brown Indoor Slippers", price: 7200, category: "slippers", image: BrownHoodie, color: "Brown", sizes: ["37", "38", "39", "40"], description: "Indoor brown slippers.", stock: 28, featured: true },
  { id: 76, name: "Classic Black Slippers", price: 8200, category: "slippers", image: BlackGown, color: "Black", sizes: ["38", "39", "40", "41"], description: "Classic black slippers.", stock: 24, featured: false },
  { id: 77, name: "Blue Soft Slippers", price: 8800, category: "slippers", image: BlueGown, color: "Blue", sizes: ["37", "38", "39", "40"], description: "Soft blue casual slippers.", stock: 19, featured: true },
  { id: 78, name: "Black Everyday Slippers", price: 9000, category: "slippers", image: BlackGownn, color: "Black", sizes: ["38", "39", "40", "41"], description: "Everyday black slippers.", stock: 21, featured: true },
  { id: 79, name: "Blue Relax Slippers", price: 7600, category: "slippers", image: BlueGownn, color: "Blue", sizes: ["37", "38", "39", "40", "41"], description: "Relaxing blue slippers.", stock: 26, featured: false },

  // ===== SHOES (10) =====
  { id: 55, name: "Classic Black Shoes", price: 18000, category: "shoes", image: BlackGown, color: "Black", sizes: ["38", "39", "40", "41", "42"], description: "Elegant black shoes for formal and casual wear.", stock: 15, featured: true },
  { id: 56, name: "Blue Casual Shoes", price: 16000, category: "shoes", image: BlueGown, color: "Blue", sizes: ["39", "40", "41", "42"], description: "Comfortable blue casual shoes.", stock: 18, featured: false },
  { id: 57, name: "Premium Black Shoes", price: 22000, category: "shoes", image: BlackGownn, color: "Black", sizes: ["38", "39", "40", "41"], description: "Premium quality black shoes.", stock: 12, featured: true },
  { id: 58, name: "Soft Blue Shoes", price: 17000, category: "shoes", image: BlueGownn, color: "Blue", sizes: ["39", "40", "41"], description: "Soft and stylish blue shoes.", stock: 14, featured: true },
  { id: 59, name: "Brown Everyday Shoes", price: 15000, category: "shoes", image: BrownHoodie, color: "Brown", sizes: ["38", "39", "40", "41", "42"], description: "Durable brown shoes for everyday use.", stock: 20, featured: false },
  { id: 80, name: "Black Smart Shoes", price: 19000, category: "shoes", image: BlackGown, color: "Black", sizes: ["39", "40", "41", "42"], description: "Smart black shoes for outings.", stock: 13, featured: true },
  { id: 81, name: "Blue Comfort Shoes", price: 16500, category: "shoes", image: BlueGown, color: "Blue", sizes: ["38", "39", "40", "41"], description: "Comfort-focused blue shoes.", stock: 17, featured: false },
  { id: 82, name: "Black Formal Shoes", price: 24000, category: "shoes", image: BlackGownn, color: "Black", sizes: ["39", "40", "41"], description: "Formal black shoes.", stock: 10, featured: true },
  { id: 83, name: "Blue Stylish Shoes", price: 17500, category: "shoes", image: BlueGownn, color: "Blue", sizes: ["38", "39", "40", "41", "42"], description: "Stylish blue shoes.", stock: 15, featured: true },
  { id: 84, name: "Brown Classic Shoes", price: 15500, category: "shoes", image: BrownHoodie, color: "Brown", sizes: ["39", "40", "41", "42"], description: "Classic brown shoes.", stock: 16, featured: false },

  // ===== JOGGERS (10) =====
  { id: 60, name: "Black Joggers", price: 14000, category: "joggers", image: BlackGown, color: "Black", sizes: ["M", "L", "XL"], description: "Comfortable black joggers for casual wear.", stock: 25, featured: true },
  { id: 61, name: "Blue Soft Joggers", price: 15000, category: "joggers", image: BlueGown, color: "Blue", sizes: ["S", "M", "L", "XL"], description: "Soft blue joggers with great fit.", stock: 20, featured: true },
  { id: 62, name: "Premium Black Joggers", price: 18000, category: "joggers", image: BlackGownn, color: "Black", sizes: ["M", "L", "XL"], description: "Premium quality black joggers.", stock: 15, featured: false },
  { id: 63, name: "Blue Everyday Joggers", price: 14500, category: "joggers", image: BlueGownn, color: "Blue", sizes: ["M", "L"], description: "Everyday comfort blue joggers.", stock: 22, featured: true },
  { id: 64, name: "Brown Casual Joggers", price: 16000, category: "joggers", image: BrownHoodie, color: "Brown", sizes: ["L", "XL"], description: "Casual brown joggers for relaxed style.", stock: 18, featured: false },
  { id: 85, name: "Black Slim Joggers", price: 15500, category: "joggers", image: BlackGown, color: "Black", sizes: ["S", "M", "L"], description: "Slim fit black joggers.", stock: 19, featured: true },
  { id: 86, name: "Blue Sport Joggers", price: 16500, category: "joggers", image: BlueGown, color: "Blue", sizes: ["M", "L", "XL"], description: "Sporty blue joggers.", stock: 14, featured: true },
  { id: 87, name: "Black Relaxed Joggers", price: 17000, category: "joggers", image: BlackGownn, color: "Black", sizes: ["L", "XL"], description: "Relaxed black joggers.", stock: 16, featured: false },
  { id: 88, name: "Blue Comfort Joggers", price: 14800, category: "joggers", image: BlueGownn, color: "Blue", sizes: ["S", "M", "L", "XL"], description: "Comfort blue joggers.", stock: 21, featured: true },
  { id: 89, name: "Brown Soft Joggers", price: 15800, category: "joggers", image: BrownHoodie, color: "Brown", sizes: ["M", "L", "XL"], description: "Soft brown joggers.", stock: 17, featured: false },

  // ===== PALAZZOS (10) =====
  { id: 65, name: "Black Palazzo Pants", price: 13000, category: "palazzos", image: BlackGown, color: "Black", sizes: ["M", "L", "XL"], description: "Elegant black palazzo pants.", stock: 20, featured: true },
  { id: 66, name: "Blue Flowing Palazzo", price: 14000, category: "palazzos", image: BlueGown, color: "Blue", sizes: ["S", "M", "L"], description: "Flowing blue palazzo for comfort and style.", stock: 18, featured: true },
  { id: 67, name: "Premium Black Palazzo", price: 17000, category: "palazzos", image: BlackGownn, color: "Black", sizes: ["M", "L", "XL"], description: "Premium black palazzo pants.", stock: 14, featured: false },
  { id: 68, name: "Soft Blue Palazzo", price: 13500, category: "palazzos", image: BlueGownn, color: "Blue", sizes: ["S", "M", "L"], description: "Soft and comfortable blue palazzo.", stock: 16, featured: true },
  { id: 69, name: "Brown Relaxed Palazzo", price: 15000, category: "palazzos", image: BrownHoodie, color: "Brown", sizes: ["M", "L", "XL"], description: "Relaxed brown palazzo for everyday wear.", stock: 12, featured: false },
  { id: 90, name: "Black Wide Palazzo", price: 14500, category: "palazzos", image: BlackGown, color: "Black", sizes: ["S", "M", "L"], description: "Wide leg black palazzo.", stock: 15, featured: true },
  { id: 91, name: "Blue Elegant Palazzo", price: 16000, category: "palazzos", image: BlueGown, color: "Blue", sizes: ["M", "L", "XL"], description: "Elegant blue palazzo pants.", stock: 13, featured: true },
  { id: 92, name: "Black Soft Palazzo", price: 15500, category: "palazzos", image: BlackGownn, color: "Black", sizes: ["M", "L"], description: "Soft black palazzo.", stock: 17, featured: false },
  { id: 93, name: "Blue Casual Palazzo", price: 13800, category: "palazzos", image: BlueGownn, color: "Blue", sizes: ["S", "M", "L", "XL"], description: "Casual blue palazzo.", stock: 19, featured: true },
  { id: 94, name: "Brown Classic Palazzo", price: 14800, category: "palazzos", image: BrownHoodie, color: "Brown", sizes: ["M", "L", "XL"], description: "Classic brown palazzo pants.", stock: 14, featured: false },
];

export default products;