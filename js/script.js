/* ==========================================================================
   [PHẦN 3 & 4: JAVASCRIPT CƠ BẢN & NÂNG CAO]
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       [PHẦN 3 - YÊU CẦU 1]: Khai báo mảng object dữ liệu tĩnh trong script.js
       ---------------------------------------------------------------------- */
    const staticSkills = [
        { ten: 'HTML5 / CSS3 / SCSS', mucDo: 'Thành thạo' },
        { ten: 'JavaScript (ES6+)', mucDo: 'Khá' },
        { ten: 'Git & GitHub', mucDo: 'Khá' },
        { ten: 'Responsive Web Design', mucDo: 'Thành thạo' }
    ];

    /* ----------------------------------------------------------------------
       [PHẦN 3 - YÊU CẦU 4 & 2]: Sử dụng Arrow Function & map() render ra DOM
       ---------------------------------------------------------------------- */
    const renderSkills = () => {
    const skillsContainer = document.getElementById('skills-container');
    if (!skillsContainer) return;

    const skillsHTML = staticSkills.map(skill => `
        <div class="skill-card">
            <h4>${skill.ten}</h4>
            <div class="skill-level">
                <span>Mức độ:</span>
                <span class="badge ${skill.mucDo === 'Thành thạo' ? 'badge-success' : 'badge-complete'}">
                    ${skill.mucDo}
                </span>
            </div>
        </div>
     `).join('');

     skillsContainer.innerHTML = skillsHTML;
    };

    renderSkills(); // Gọi hàm render kỹ năng tĩnh

    /* ----------------------------------------------------------------------
       [PHẦN 4 - YÊU CẦU 1, 2, 4]: Fetch API async/await + try/catch render data.json
       ---------------------------------------------------------------------- */
    const fetchProjects = async () => {
        const projectsContainer = document.getElementById('projects-container');

        try {
            // [Phần 4 - Yêu cầu 1]: Đọc dữ liệu từ file js/data.json bằng fetch()
            const response = await fetch('js/data.json');
            
            if (!response.ok) {
                throw new Error(`Lỗi kết nối HTTP: ${response.status}`);
            }

            const data = await response.json();

            // [Phần 4 - Yêu cầu 2]: Hiển thị dữ liệu lên trang qua thao tác DOM
            projectsContainer.innerHTML = data.map(project => `
                <article class="project-card">
                    <h3>${project.ten}</h3>
                    <p><strong>Công nghệ:</strong> ${project.congNghe}</p>
                    <p><strong>Năm hoàn thành:</strong> ${project.namHoanThanh}</p>
                </article>
            `).join('');

        } catch (error) {
            // [Phần 4 - Yêu cầu 4]: Xử lý try/catch log lỗi console và hiển thị thông báo
            console.error('Lỗi khi fetch dữ liệu dự án:', error);
            projectsContainer.innerHTML = `
                <div class="form-response error" style="display:block; grid-column: 1/-1;">
                    Không thể tải danh sách dự án. Vui lòng kiểm tra lại đường dẫn file hoặc chạy qua Live Server!
                </div>
            `;
        }
    };

    fetchProjects();

    /* ----------------------------------------------------------------------
       [PHẦN 4 - YÊU CẦU 3]: Sử dụng LocalStorage lưu chế độ Sáng/Tối (Dark/Light)
       ---------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    // Khởi tạo trạng thái đã lưu
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        let theme = 'light';
        
        if (document.body.classList.contains('dark-theme')) {
            theme = 'dark';
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }

        // Lưu trạng thái vào LocalStorage
        localStorage.setItem('theme', theme);
    });

    /* ----------------------------------------------------------------------
       [PHẦN 3 - YÊU CẦU 3]: Xử lý submit form bằng addEventListener + Validate JS
       ---------------------------------------------------------------------- */
    const contactForm = document.getElementById('contact-form');
    const formResponse = document.getElementById('form-response');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Ngăn submit reload trang

        // Lấy dữ liệu input
        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        let isValid = true;
        
        // Validate đơn giản bằng JS
        if (fullname.length < 3) {
            isValid = false;
        }

        const phoneRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/;
        if (!phoneRegex.test(phone)) {
            isValid = false;
        }

        if (!isValid) {
            formResponse.className = 'form-response error';
            formResponse.textContent = 'Vui lòng kiểm tra lại thông tin nhập (Họ tên > 3 ký tự, SĐT đúng định dạng VN).';
            return;
        }

        // Thông báo thành công
        formResponse.className = 'form-response success';
        formResponse.textContent = 'Cảm ơn bạn! Tin nhắn đã được gửi thành công.';
        contactForm.reset();
    });
});