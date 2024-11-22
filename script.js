const ctx = document.getElementById('marketChart').getContext('2d');

// Data Candlestick (Tren Naik dan Turun)
const candlestickData = [];
const startDate = new Date('2024-11-01');
let openPrice = 10000000;

for (let i = 0; i < 50; i++) {
    const isUptrend = i % 2 === 0; // Pola bergantian: naik (even index) dan turun (odd index)
    const change = Math.random() * 100; // Fluktuasi harga
    const open = openPrice;
    const high = open + change + Math.random() * 50; // High sedikit lebih tinggi
    const low = open - (Math.random() * 50); // Low sedikit lebih rendah
    const close = isUptrend ? open + change : open - change; // Close naik/turun tergantung tren

    candlestickData.push({
        x: new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000), // Interval harian
        o: open,
        h: high,
        l: low,
        c: close,
    });

    openPrice = close; // Harga close menjadi harga open berikutnya
}

// Konfigurasi Grafik Candlestick
const marketChart = new Chart(ctx, {
    type: 'candlestick',
    data: {
        datasets: [
            {
                label: 'Market Data',
                data: candlestickData,
                borderWidth: 1, // Ketebalan garis
                barPercentage: 0.02, // Lebar bar
            },
        ],
    },
    options: {
        responsive: true,
        layout: {
            padding: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day', // Skala harian
                },
                grid: {
                    display: false, // Hilangkan grid
                },
            },
            y: {
                grid: {
                    display: false,
                },
            },
        },
    },
});
