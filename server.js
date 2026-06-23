import app from './app.js';
import connectDB from './config/db.js';
import seedSuperAdmin from './config/seed.js';

const PORT = process.env.PORT || 3000;

await connectDB();
await seedSuperAdmin();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
