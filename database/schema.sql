DROP TABLE IF EXISTS donations CASCADE;
DROP TABLE IF EXISTS adoption_requests CASCADE;
DROP TABLE IF EXISTS pets CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    profile_image_url VARCHAR(500),
    is_verified_shelter BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    uploader_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    species VARCHAR(50) NOT NULL,
    gender VARCHAR(20),
    age VARCHAR(50),
    location VARCHAR(100),
    description TEXT,
    health_notes TEXT,
    image_url VARCHAR(500),
    status VARCHAR(20) DEFAULT 'Tersedia' 
        CHECK (status IN ('Tersedia', 'Diproses', 'Diadopsi')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE adoption_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    adopter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'Menunggu' 
        CHECK (status IN ('Menunggu', 'Diterima', 'Ditolak')),
    application_reason TEXT NOT NULL,
    request_date TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(12, 2) NOT NULL CHECK (amount > 0),
    message VARCHAR(500),
    payment_status VARCHAR(20) DEFAULT 'Pending' 
        CHECK (payment_status IN ('Pending', 'Success')),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_pets_uploader_id ON pets(uploader_id);
CREATE INDEX idx_pets_species ON pets(species);
CREATE INDEX idx_pets_status ON pets(status);
CREATE INDEX idx_pets_location ON pets(location);
CREATE INDEX idx_adoption_requests_pet_id ON adoption_requests(pet_id);
CREATE INDEX idx_adoption_requests_adopter_id ON adoption_requests(adopter_id);
CREATE INDEX idx_donations_donor_id ON donations(donor_id);
