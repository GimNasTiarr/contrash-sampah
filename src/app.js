document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      { id: 4, name: 'Sampah Kertas', img: '4.jpg', price: 1500 },
      { id: 5, name: 'Sampah Botol', img: '5.jpg', price: 2500 },
      { id: 6, name: 'Sampah Logam', img: '6.jpg', price: 9000 },
      { id: 7, name: 'Sampah Eletronik', img: '7.jpg', price: 20000 },
    ],
  }));


  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      //cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      //jika belum ada / cart masih kosong
      if(!cartItem) {
        this.items.push({...newItem, quantity: 1, total: newItem.price});
        this.quantity++;
        this.total += newItem.price;
      } else {
        // Jika barang sudah ada, cek apakah barang beda atau sama dengan di cart     }
        this.items = this.items.map((item) => {
          //Jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // Jika barang sudah ada, tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item yang mau di remove berdasarkan idnya
      const cartItem = this.items.find((item) => item.id === id);

      //jika item lebih dari 1
      if(cartItem.quantity > 1) {
        //telunsuri 1 1
        this.items = this.items.map((item) => {
          //jika bukan barang yang di klik
          if(item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price
            return item;
          }
        })
      } else if (cartItem.quantity === 1) {
        // jika barang sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Konversi ke Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};