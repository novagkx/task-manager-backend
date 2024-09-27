create TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    priority VARCHAR(255),
    status VARCHAR(255),
    deadline DATE,
    today boolean
);
