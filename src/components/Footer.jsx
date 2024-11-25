function Footer() {
  return (
    <footer class="bg-white shadow mt-8">
      <div class="container mx-auto p-4 text-center">
        <p class="text-gray-600">&copy; {new Date().getFullYear()} New App</p>
        <p class="mt-2">
          صنع باستخدام <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">ZAPT</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;