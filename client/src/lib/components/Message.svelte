<script>
    import { PUBLIC_API_URL } from "$env/static/public";
    let message = "";

    async function fetchMessage() {
        const r = await fetch(PUBLIC_API_URL);
        message = (await r.json()).message;
    }
</script>

<button on:click={fetchMessage}>Fetch message</button>
<p>Message is: {message}</p>