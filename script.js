document.addEventListener("DOMContentLoaded", () => {
    const entryForm = document.getElementById("entry-form");
    const descriptionInput = document.getElementById("description");
    const amountInput = document.getElementById("amount");
    const typeInput = document.getElementById("type");
    const entriesList = document.getElementById("entries-list");
    const totalIncome = document.getElementById("total-income");
    const totalExpense = document.getElementById("total-expense");
    const netBalance = document.getElementById("net-balance");
    const resetBtn = document.getElementById("reset-btn");
    const filters = document.querySelectorAll('input[name="filter"]');
  
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
  
    // Render entries
    const renderEntries = (filter = "all") => {
      entriesList.innerHTML = "";
      let totalInc = 0;
      let totalExp = 0;
  
      entries
        .filter((entry) => filter === "all" || entry.type === filter)
        .forEach((entry, index) => {
          const li = document.createElement("li");
          li.innerHTML = `
            <span>${entry.description} - $${entry.amount} (${entry.type})</span>
            <div>
              <button onclick="editEntry(${index})">Edit</button>
              <button class="delete" onclick="deleteEntry(${index})">Delete</button>
            </div>
          `;
          entriesList.appendChild(li);
  
          if (entry.type === "income") totalInc += entry.amount;
          else totalExp += entry.amount;
        });
  
      totalIncome.textContent = totalInc;
      totalExpense.textContent = totalExp;
      netBalance.textContent = totalInc - totalExp;
    };
  
    // Add entry
    entryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const description = descriptionInput.value.trim();
      const amount = parseFloat(amountInput.value);
      const type = typeInput.value;
  
      if (description && amount > 0) {
        entries.push({ description, amount, type });
        localStorage.setItem("entries", JSON.stringify(entries));
        renderEntries();
        entryForm.reset();
      }
    });
  
    // Edit entry
    window.editEntry = (index) => {
      const entry = entries[index];
      descriptionInput.value = entry.description;
      amountInput.value = entry.amount;
      typeInput.value = entry.type;
      entries.splice(index, 1);
      localStorage.setItem("entries", JSON.stringify(entries));
      renderEntries();
    };
  
    // Delete entry
    window.deleteEntry = (index) => {
      entries.splice(index, 1);
      localStorage.setItem("entries", JSON.stringify(entries));
      renderEntries();
    };
  
    // Reset form
    resetBtn.addEventListener("click", () => {
      entryForm.reset();
    });
  
    // Filter entries
    filters.forEach((filter) => {
      filter.addEventListener("change", (e) => {
        renderEntries(e.target.value);
      });
    });
  
    // Initial render
    renderEntries();
  });