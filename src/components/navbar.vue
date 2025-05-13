<template>
    <nav class="navbar">
      <div class="logo">
        <a href="../App.vue"><img src="../assets/logo.png" alt="logo"></a>
        <a href="../App.vue">InfoNow</a>
      </div>
    </nav>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #ffffff;
    color: rgb(12, 12, 12);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid;
    max-width: 100%;
  }
  
  .logo {
    font-size: 1.4rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .logo img{
    width: 50px;
    height: 50px;
    justify-content: left;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }

  
  @media (max-width: 768px) {
    .navbar {
      padding: 1rem;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .logo {
      font-size: 1.2rem;
    }
    
  }
  </style>