function Product(name, category, hasDiscount, price) {
    this.name = name;
    this.category = category;
    this.hasDiscount = hasDiscount;
    this.price = price;
  }
  
  const products = [
    new Product("Apple", "Food", true, 1.5),
    new Product("Banana", "Food", false, 2.0),
    new Product("Carrot", "Vegetable", true, 0.8),
    new Product("Cherry", "Food", false, 2.6),
  ];
  
  const expensiveProducts = products.filter(product => product.price > 20);
  console.log("Products with price greater than 20:", expensiveProducts);
  
  const foodProductsOnDiscount = products
    .filter(product => product.category === "Food" && product.hasDiscount)
    .map(product => product.name);
  console.log("Food products on discount:", foodProductsOnDiscount);
  
  const pricesOfDiscountedProducts = products
    .filter(product => product.hasDiscount)
    .map(product => product.price);
  console.log("Prices of products on discount:", pricesOfDiscountedProducts);
  
  const vowelProductsNotOnDiscount = products
    .filter(product => /^[aeiou]/i.test(product.name) && !product.hasDiscount)
    .map(product => ({ name: product.name, price: product.price }));
  console.log("Products starting with a vowel and not on discount:", vowelProductsNotOnDiscount);
  