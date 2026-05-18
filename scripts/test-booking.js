(async ()=>{
  const baseAuth = 'http://localhost:3069/api/QuanLyNguoiDung';
  const baseBooking = 'http://localhost:3069/api/QuanLyDatVe';
  try{
    const login = await fetch(`${baseAuth}/DangNhap`, {
      method:'POST',
      headers: { 'Content-Type': 'application/json', 'TokenCybersoft': 'sampletoken' },
      body: JSON.stringify({ taiKhoan: 'testuser1234@example.com', matKhau: 'password123' }),
    });
    const loginJson = await login.json();
    console.log('LOGIN', login.status, JSON.stringify(loginJson));
    const token = loginJson.accessToken;

    const booking = await fetch(`${baseBooking}/DatVe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'TokenCybersoft': 'sampletoken',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ maLichChieu: 1, danhSachVe: [ { maGhe: 3, giaVe: 100000 } ] }),
    });
    const bookingJson = await booking.json();
    console.log('BOOK', booking.status, JSON.stringify(bookingJson));
  } catch (e) { console.error('ERR', e); process.exit(1); }
})();
