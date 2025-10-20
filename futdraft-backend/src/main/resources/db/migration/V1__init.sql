CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE app_user (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(120) NOT NULL,
    email VARCHAR(160) UNIQUE NOT NULL,
    password_hash VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE game (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
    date TIMESTAMP NOT NULL,
    location VARCHAR(160),
    team_size INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE team (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_id UUID NOT NULL REFERENCES game(id) ON DELETE CASCADE,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE player (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_id UUID NOT NULL REFERENCES game(id) ON DELETE CASCADE,
    user_id UUID NULL REFERENCES app_user(id),
    name VARCHAR(120) NOT NULL
);

CREATE TYPE event_type AS ENUM ('GOAL','ASSIST');
CREATE TABLE event (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_id UUID NOT NULL REFERENCES game(id) ON DELETE CASCADE,
    team_id UUID REFERENCES team(id) ON DELETE SET NULL,
    player_id UUID NOT NULL REFERENCES player(id) ON DELETE CASCADE,
    type event_type NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
