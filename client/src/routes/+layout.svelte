<script>
  let { children } = $props();
</script>

<header>
  <h1>My application</h1>
</header>

<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>

<div>
  {@render children()}
</div>

<footer>
  <p>My application is cool.</p>
</footer>

export const ssr = false;