INSERT INTO users (id, name, email, password_hash, phone, is_verified_shelter, role) VALUES
('11111111-1111-4111-a111-111111111111', 'Akbar Rahman', 'akbar@example.com', '$2b$10$8KzaNdKIMyOkASCBqfG2JeFdBGOiVQHEoSBqaXGsjOcEBfMhiDPfi', '081234567890', false, 'user'),
('22222222-2222-4222-a222-222222222222', 'Daffa Pratama', 'daffa@example.com', '$2b$10$8KzaNdKIMyOkASCBqfG2JeFdBGOiVQHEoSBqaXGsjOcEBfMhiDPfi', '081234567891', false, 'user'),
('33333333-3333-4333-a333-333333333333', 'Nabil Azhari', 'nabil@example.com', '$2b$10$8KzaNdKIMyOkASCBqfG2JeFdBGOiVQHEoSBqaXGsjOcEBfMhiDPfi', '081234567892', false, 'user'),
('44444444-4444-4444-a444-444444444444', 'Jakarta Animal Shelter', 'shelter@example.com', '$2b$10$8KzaNdKIMyOkASCBqfG2JeFdBGOiVQHEoSBqaXGsjOcEBfMhiDPfi', '02112345678', true, 'user'),

INSERT INTO pets (id, uploader_id, name, species, gender, age, location, description, health_notes, status) VALUES
('aaaa1111-1111-4111-a111-111111111111', '11111111-1111-4111-a111-111111111111', 'Milo', 'Kucing', 'Jantan', '2 tahun', 'Jakarta Selatan', 'Kucing oranye yang sangat ramah dan suka bermain. Cocok untuk keluarga dengan anak-anak.', 'Sudah vaksin lengkap, steril', 'Tersedia'),
('aaaa2222-2222-4222-a222-222222222222', '11111111-1111-4111-a111-111111111111', 'Luna', 'Kucing', 'Betina', '1 tahun', 'Jakarta Barat', 'Kucing berbulu putih bersih, pendiam tapi penyayang.', 'Vaksin rabies sudah, belum steril', 'Tersedia'),
('aaaa3333-3333-4333-a333-333333333333', '22222222-2222-4222-a222-222222222222', 'Buddy', 'Anjing', 'Jantan', '3 tahun', 'Depok', 'Golden Retriever yang sangat aktif dan loyal. Butuh halaman luas.', 'Sehat, vaksin lengkap, sudah steril', 'Tersedia'),
('aaaa4444-4444-4444-a444-444444444444', '44444444-4444-4444-a444-444444444444', 'Kopi', 'Anjing', 'Jantan', '6 bulan', 'Jakarta Timur', 'Anak anjing campuran yang diselamatkan dari jalanan. Sangat ceria.', 'Dalam proses vaksinasi', 'Diproses'),
('aaaa5555-5555-4555-a555-555555555555', '44444444-4444-4444-a444-444444444444', 'Cici', 'Kucing', 'Betina', '4 tahun', 'Tangerang', 'Kucing calico yang tenang dan cocok untuk apartemen.', 'Sehat, sudah steril', 'Tersedia'),
('aaaa6666-6666-4666-a666-666666666666', '33333333-3333-4333-a333-333333333333', 'Rocky', 'Anjing', 'Jantan', '2 tahun', 'Bekasi', 'Anjing penjaga yang jinak dan setia. Sudah terlatih dasar.', 'Vaksin lengkap', 'Diadopsi');

INSERT INTO adoption_requests (id, pet_id, adopter_id, status, application_reason) VALUES
('bbbb1111-1111-4111-a111-111111111111', 'aaaa3333-3333-4333-a333-333333333333', '11111111-1111-4111-a111-111111111111', 'Menunggu', 'Saya punya halaman luas di rumah dan pengalaman memelihara anjing sebelumnya. Buddy akan sangat cocok dengan keluarga kami.'),
('bbbb2222-2222-4222-a222-222222222222', 'aaaa4444-4444-4444-a444-444444444444', '22222222-2222-4222-a222-222222222222', 'Diterima', 'Saya tinggal di rumah dengan taman kecil dan sudah siap merawat anak anjing. Akan membawa Kopi ke dokter hewan secara rutin.'),
('bbbb3333-3333-4333-a333-333333333333', 'aaaa6666-6666-4666-a666-666666666666', '22222222-2222-4222-a222-222222222222', 'Diterima', 'Saya mencari anjing penjaga untuk menemani di rumah. Rocky terlihat sangat cocok.');

INSERT INTO donations (id, donor_id, amount, message, payment_status) VALUES
('cccc1111-1111-4111-a111-111111111111', '11111111-1111-4111-a111-111111111111', 150000.00, 'Semoga bisa membantu operasional shelter. Terima kasih atas kerja kerasnya!', 'Success'),
('cccc2222-2222-4222-a222-222222222222', '22222222-2222-4222-a222-222222222222', 75000.00, 'Untuk makanan hewan-hewan di shelter.', 'Success'),
('cccc3333-3333-4333-a333-333333333333', '33333333-3333-4333-a333-333333333333', 200000.00, 'Donasi bulanan untuk Jakarta Animal Shelter.', 'Pending');