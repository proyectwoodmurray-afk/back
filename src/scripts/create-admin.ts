import { MongoClient } from 'mongodb';
import * as bcrypt from 'bcrypt';

async function createAdminUser() {
  // URI directa para desarrollo local
  const uri = 'mongodb+srv://murray:Proyectwoodmurray1.@dtwood.jf9payk.mongodb.net/wood';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Conectado a MongoDB');

    const db = client.db();
    const usersCollection = db.collection('users');

    // Verificar si ya existe un usuario admin
    const existingAdmin = await usersCollection.findOne({ email: 'admin@admin.com' });
    
    if (existingAdmin) {
      console.log('El usuario administrador ya existe');
      return;
    }

    // Crear nuevo usuario admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const adminUser = {
      email: 'admin@admin.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await usersCollection.insertOne(adminUser);
    console.log('Usuario administrador creado exitosamente');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('Desconectado de MongoDB');
  }
}

// Ejecutar el script
createAdminUser(); 