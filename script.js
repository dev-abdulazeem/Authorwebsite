const toggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

toggle.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

   const form = document.getElementById("subscribeForm");
    const message = document.getElementById("message");

    form.addEventListener("submit", async function(event) {
      event.preventDefault(); // stop redirect

      const email = document.getElementById("email").value;

      try {
        const response = await fetch("https://formspree.io/f/your-form-id", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        });

        if (response.ok) {
          message.textContent = "✅ Thanks! You have subscribed.";
          form.reset();
        } else {
          message.textContent = "❌ Something went wrong. Please try again.";
        }
      } catch (error) {
        message.textContent = "⚠ Error connecting to server.";
      }
    });
