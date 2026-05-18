(async ()=>{
  const base = 'http://localhost:3069/api/QuanLyNguoiDung';
  const regBody = { taiKhoan:'testuser1234', email:'testuser1234@example.com', matKhau:'password123', hoTen:'Test User', maNhom:'GP01' };
  try{
    const r = await fetch(`${base}/DangKy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'TokenCybersoft': 'sampletoken' },
      body: JSON.stringify(regBody),
    });
    const text = await r.text();
    console.log('REGISTER', r.status, text);
  } catch (e) {
    console.error('REGISTER_ERR', e);
    process.exit(1);
  }

  try{
    const r2 = await fetch(`${base}/DangNhap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'TokenCybersoft': 'sampletoken' },
      body: JSON.stringify({ taiKhoan: 'testuser1234@example.com', matKhau: 'password123' }),
    });
    const json = await r2.json();
    console.log('LOGIN', r2.status, JSON.stringify(json));
  } catch (e) {
    console.error('LOGIN_ERR', e);
    process.exit(1);
  }
})();
