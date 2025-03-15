let keranjang = [];
let totalHarga = 0;
let metodePembayaran = "";

function tambahKeKeranjang(nama, harga) {
    keranjang.push({ nama, harga });
    totalHarga += harga;
    updateKeranjang();

    let keranjangElement = document.querySelector(".keranjang");
    keranjangElement.classList.add("shake");
    setTimeout(() => {
        keranjangElement.classList.remove("shake");
    }, 500);
}

function updateKeranjang() {
    let daftarKeranjang = document.getElementById("daftar-keranjang");
    daftarKeranjang.innerHTML = "";

    keranjang.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${item.nama} - Rp ${item.harga.toLocaleString()} 
                        <button class="hapus-item" onclick="hapusItem(${index})">❌</button>`;
        daftarKeranjang.appendChild(li);
    });

    document.getElementById("total-harga").textContent = totalHarga.toLocaleString();
}

function hapusItem(index) {
    totalHarga -= keranjang[index].harga;
    keranjang.splice(index, 1);
    updateKeranjang();
}

function pilihPembayaran(metode) {
    metodePembayaran = metode;

    let pilihan = document.querySelectorAll(".pilihan");
    pilihan.forEach(el => el.classList.remove("active"));

    document.querySelectorAll(`.pilihan input[value="${metode}"]`)
        .forEach(el => el.parentElement.classList.add("active"));
}

function checkout() {
    if (keranjang.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    if (metodePembayaran === "") {
        alert("Pilih metode pembayaran terlebih dahulu!");
        return;
    }

    let pesanWA = "Halo! Saya ingin membeli:\n";

    keranjang.forEach(item => {
        pesanWA += `- ${item.nama} - Rp ${item.harga.toLocaleString()}\n`;
    });

    pesanWA += `\nTotal: Rp ${totalHarga.toLocaleString()}`;
    pesanWA += `\nMetode Pembayaran: ${metodePembayaran}`;
    pesanWA += `\n\nTolong proses ya! 🙏`;

    let nomorWA = "+6281289181330";
    let linkWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesanWA)}`;

    window.location.href = linkWA;
}
