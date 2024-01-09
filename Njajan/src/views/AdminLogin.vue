<template>
  <div class="login-container">
    <h1>Login Admin</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username">
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password">
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    handleLogin() {
      // Validasi login (contoh sederhana)
      if (this.username === 'admin' && this.password === 'admin123') {
        this.$router.push('/manage-food'); // Ganti dengan rute halaman pengelolaan makanan
      } else {
        alert('Username atau password salah!');
      }
    }
  }
};
</script>

<!-- Tambahkan styling sesuai kebutuhan -->
<style>
.login-container {
  /* Style untuk container login */
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}
</style>
