interface IUser {
    _id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
  }
  
  class LoginForm {
    createForm(): HTMLFormElement {
      const form = document.createElement('form');
      form.id = 'form';
      form.innerHTML = `
      <div id='form__field'>
          <label for='email' id='form__label'>E-mail:</label>
          <input type='email' id='email' name='email' placeholder='Enter e-mail' required>
      </div>
      <div id='form__field'>
          <label for='password' id='form__label'>Password:</label>
          <input type='password' id='password' name='password' placeholder='Enter your password' required>
      </div>
      <div id='form__field'>
          <button type='submit' id='form__button'>Login</button>
      </div>
      `;
      return form;
    }
  }
  
  class FormValidator {
    static isValidEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    static isValidPassword(password: string): boolean {
      return password.length >= 6;
    }
  }
  
  async function submitLoginForm(event: Event) {
    try {
      event.preventDefault();
  
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
  
      if (!FormValidator.isValidEmail(email)) {
        throw new Error('Invalid email');
      }
  
      if (!FormValidator.isValidPassword(password)) {
        throw new Error('Password must be at least 6 characters');
      }
  
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(`Welcome, ${data.message}`);
      } else {
        const message = await response.text();
        throw new Error(message);
      }
    } catch (error) {
      alert(error.message);
    }
  }
  
  const appContainer = document.getElementById('app') as HTMLDivElement;
  const loginForm = new LoginForm().createForm();
  loginForm.addEventListener('submit', submitLoginForm);
  appContainer.append(loginForm);
  