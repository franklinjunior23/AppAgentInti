const migration_initial = `CREATE TABLE IF NOT EXISTS cpu (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    cores INTEGER NOT NULL,
    threads INTEGER NOT NULL,
    speed REAL NOT NULL,
    speed_max REAL NOT NULL,
    speed_min REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS ram (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    type TEXT NOT NULL,
    capacity INTEGER NOT NULL,
    speed INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS storage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    type TEXT NOT NULL,
    capacity INTEGER NOT NULL,
    vendor TEXT NOT NULL,
    serial TEXT NOT NULL UNIQUE,
    firmware_revision TEXT NOT NULL,
    smart_status TEXT NOT NULL,
    filesystem TEXT NOT NULL,
    size INTEGER NOT NULL,
    used INTEGER NOT NULL,
    available INTEGER NOT NULL,
    use_percentage INTEGER NOT NULL,
    mounted TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS network (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    mac TEXT NOT NULL UNIQUE,
    ip4 TEXT,
    ip6 TEXT,
    type TEXT NOT NULL,
    speed INTEGER,
    status TEXT NOT NULL,
    is_dhcp BOOLEAN NOT NULL CHECK (is_dhcp IN (0,1)),
    is_virtual BOOLEAN NOT NULL CHECK (is_virtual IN (0,1))
);

CREATE TABLE IF NOT EXISTS gpu (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    vram INTEGER NOT NULL,
    position TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS motherboard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    socket TEXT NOT NULL,
    quantity_slots INTEGER NOT NULL,
    serial TEXT NOT NULL UNIQUE,
    memory_max INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS bios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    release_date TEXT NOT NULL,
    vendor TEXT NOT NULL,
    version TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS usb (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    vendor TEXT NOT NULL,
    serial TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS printer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    model TEXT NOT NULL,
    status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

`

export { migration_initial }
