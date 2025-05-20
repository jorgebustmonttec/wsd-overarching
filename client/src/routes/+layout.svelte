<script>
  import "../app.css";
  let { children } = $props();
</script>

<div class="flex flex-col min-h-screen">
  <header class="flex items-center bg-primary-100 p-4 mb-6">
    <nav class="ml-4">
      <ul class="flex space-x-4">
        <li><a class="anchor" href="/">Home</a></li>
        <li><a class="anchor" href="/courses">Courses</a></li>
      </ul>
    </nav>
  </header>

  <main class="container mx-auto max-w-2xl grow">
    {@render children()}
  </main>

  <footer class="p-4 border-t-2 border-gray-300">
    <p class="text-center">Footer</p>
  </footer>
</div>