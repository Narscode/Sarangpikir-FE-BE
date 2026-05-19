/**
 * Welcome Screen - Landing Page
 */
const WelcomePage = {
    render() {
        const container = document.createElement('div');
        container.className = 'welcome-screen';

        // Form layout inside welcome-actions
        this.renderInitialView(container);
        return container;
    },

    renderInitialView(container) {
        container.innerHTML = `
            <div class="welcome-image">
                <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&h=600&fit=crop" 
                     alt="Peaceful plant" loading="eager" style="opacity: 0.9;">
            </div>
            
            <h1 class="welcome-title">Your sanctuary for peace of mind</h1>
            <p class="welcome-subtitle">Take a deep breath. You've found a gentle space to track your journey and find balance.</p>
            
            <div class="welcome-actions" id="welcome-actions-container">
                <button class="btn btn-primary" id="btn-get-started">Get Started</button>
                <button class="btn btn-outline" id="btn-sign-in">Sign In</button>
            </div>
            
            <div class="privacy-note">🔒 Your privacy is our priority</div>
        `;

        container.querySelector('#btn-get-started').addEventListener('click', () => this.renderRegisterForm(container));
        container.querySelector('#btn-sign-in').addEventListener('click', () => this.renderLoginForm(container));
    },

    renderRegisterForm(container) {
        const actionsContainer = container.querySelector('#welcome-actions-container');
        actionsContainer.innerHTML = `
            <form id="register-form" class="welcome-form">
                <input type="text" id="reg-name" class="welcome-input" placeholder="Your Name" required>
                <input type="email" id="reg-email" class="welcome-input" placeholder="Email Address" required>
                <input type="password" id="reg-password" class="welcome-input" placeholder="Password" required>
                <button type="submit" class="btn btn-primary" style="margin-top: 8px;">Create Account</button>
                <button type="button" class="btn-text" id="btn-back">← Back</button>
            </form>
        `;

        actionsContainer.querySelector('#btn-back').addEventListener('click', () => this.renderInitialView(container));

        actionsContainer.querySelector('#register-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;

            try {
                const response = await api.register(name, email, password);
                App.state.authToken = response.token;
                App.state.currentUser = response.user;
                router.navigate('home');
            } catch (err) {
                App.showToast(err.message, 'error');
            }
        });
    },

    renderLoginForm(container) {
        const actionsContainer = container.querySelector('#welcome-actions-container');
        actionsContainer.innerHTML = `
            <form id="login-form" class="welcome-form">
                <input type="email" id="login-email" class="welcome-input" placeholder="Email Address" required>
                <input type="password" id="login-password" class="welcome-input" placeholder="Password" required>
                <button type="submit" class="btn btn-primary" style="margin-top: 8px;">Sign In</button>
                <button type="button" class="btn-text" id="btn-back">← Back</button>
            </form>
        `;

        actionsContainer.querySelector('#btn-back').addEventListener('click', () => this.renderInitialView(container));

        actionsContainer.querySelector('#login-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            try {
                const response = await api.login(email, password);
                App.state.authToken = response.token;
                App.state.currentUser = response.user;
                router.navigate('home');
            } catch (err) {
                App.showToast(err.message, 'error');
            }
        });
    }
};