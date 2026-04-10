export default function decorate(block) {
  const rows = [...block.children];

  const email = rows[0]?.textContent.trim();
  const title = rows[1]?.textContent.trim();
  const subtitle = rows[2]?.textContent.trim();

  const container = document.createElement('div');
  container.className = 'contact';

  // Title
  const heading = document.createElement('h2');
  heading.textContent = title;

  // Subtitle
  const desc = document.createElement('p');
  desc.textContent = subtitle;

  // Form
  const form = document.createElement('form');

  form.innerHTML = `
    <input name="name" placeholder="Your Name" required />
    <input name="email" type="email" placeholder="Your Email" required />
    <input name="phone" placeholder="Phone Number" />
    <input name="company" placeholder="Company / Project" />
    <button type="submit">Send Message</button>
  `;

  // Submit logic
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const name = data.get('name');
    const userEmail = data.get('email');
    const phone = data.get('phone');
    const company = data.get('company');

    const subject = `Contact Request from ${name}`;

    const body = `
Name: ${name}
Email: ${userEmail}
Phone: ${phone}
Company/Project: ${company}
    `;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&cc=${encodeURIComponent(userEmail)}`;

    window.location.href = mailtoLink;
  });

  container.append(heading, desc, form);

  block.textContent = '';
  block.append(container);
}