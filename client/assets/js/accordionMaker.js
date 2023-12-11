const accordionMaker = (user) => {
  return `
    <div class="accordion-item">
        <h2 class="accordion-header" id="heading${user.id}">
        <button class="accordion-button d-flex collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${user.id}" aria-expanded="false" aria-controls="collapse${user.id}">
            <span class="m-0 name">${user.fullName}</span>
            <span class="mx-3 role">${user.role}</span>
        </button>
        </h2>
        <div id="collapse${user.id}" class="accordion-collapse collapse" aria-labelledby="heading${user.id}" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body d-flex flex-column">
            <span>Email:  <strong class="userDetail mt-1 text-dark">${user.email}</strong></span>
            <span>Password:  <strong class="userDetail mt-1 text-dark">${user.email}</strong></span>
            <span>Registration Date:  <strong class="userDetail mt-1 text-dark">${user.date}</strong></span>
            </div>
        </div>
    </div>
    `;
};

export default accordionMaker;
