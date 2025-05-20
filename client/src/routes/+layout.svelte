<script>
  import "../app.css";
  let { children } = $props();
</script>

<div class="flex flex-col min-h-screen">
  <header class="flex items-center bg-primary-100 p-4 mb-6">
    <h1 class="text-xl text-primary-900">Application name</h1>
    <nav class="ml-4">
      <ul class="flex space-x-4">
        <li><a class="anchor" href="#">Link 1</a></li>
        <li><a class="anchor" href="#">Link 2</a></li>
        <li><a class="anchor" href="#">Link 3</a></li>
      </ul>
    </nav>
  </header>

  <main class="container mx-auto max-w-2xl grow">
    {@render children()}
  </main>

  <footer class="p-4 border-t-2 border-gray-300">
    <p class="text-center">Unicorns rule Scotland</p>
  </footer>
</div>