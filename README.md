# HealthHub: SDG 3 - Good Health and Well-being
### Sexual Health Education, Chatbot, Self-Assessment, & Community Forum

![Status](https://img.shields.io/badge/Status-Complete-success)
![SDG](https://img.shields.io/badge/SDG-3_Good_Health-blue)
![Tech Stack](https://img.shields.io/badge/Tech-HTML_%7C_CSS_%7C_JS-orange)
![Course](https://img.shields.io/badge/Course-DSA_CC105-purple)

## 📌 Project Overview
**HealthHub** is a digital utility designed to support **United Nations SDG 3: Good Health and Well-being**. It specifically addresses the lack of accessible, judgment-free information regarding sexual and reproductive health.

The application serves as a comprehensive resource featuring an **algorithmic chatbot**, a **decision-tree based self-assessment tool**, and a **community forum**, ensuring that users have access to medically accurate advice and peer support.

## 🎯 SDG Integration
* **Goal 3:** Ensure healthy lives and promote well-being for all at all ages.
* **Target 3.7:** By 2030, ensure universal access to sexual and reproductive health-care services, including for family planning, information and education, and the integration of reproductive health into national strategies and programmes.

***

## ⚙️ Data Structures & Algorithms (DSA) Implementation
This project utilizes core DSA concepts to ensure efficient data retrieval and logical flow, strictly adhering to the complexity analysis in our documentation:

### 1. Linear Search — *Chatbot (Intelligent Agent)*
* **Application:** The `responses` array stores objects containing regex patterns and answers.
* **Logic:** The agent iterates through the array sequentially, matching the user's input string against the regex patterns until a match is found.
* **Complexity:** **O(N)** (Linear Time), where N is the number of predefined patterns. This was chosen over complex NLP for reliability and simplicity given the fixed dataset.

### 2. Decision Trees — *Self-Assessment Module*
* **Application:** The "Diagnostic Engine" uses a Non-Linear Data Structure (Tree).
* **Logic:** The algorithm traverses from a root node through "Yes/No" branches (`parent` → `child node`). Each user choice eliminates a subtree of possibilities until a leaf node (the Result) is reached.
* **Complexity:** **O(H)** (Height of the Tree). This allows for rapid triage without evaluating every possible condition.

### 3. Sorting Algorithms (Merge/Quick Sort) — *Community Forum*
* **Application:** The Forum posts are dynamically organized.
* **Logic:** We implement a sorting logic that compares post objects by their "Likes" count or "Timestamp".
* **Complexity:** **O(N log N)**. This ensures that the most relevant or popular community advice bubbles to the top efficiently, even as the number of posts grows.

### 4. Hash Maps (Direct Addressing) — *Information Modal*
* **Application:** The Educational Content Library.
* **Logic:** Static content files are indexed by unique IDs (e.g., `modal-101`). When a user clicks "Learn More," the system retrieves the data instantly using the ID as a key.
* **Complexity:** **O(1)** (Constant Time). This eliminates latency, ensuring instant access to medical definitions regardless of library size.

---

## 🚀 How to Run

1.  **Download** or Clone this repository.
2.  Navigate to the `code/` folder.
3.  **Double-click `index.html`** to open it in any modern web browser (Chrome, Edge, Firefox, Safari).
      * *Note: No installation or server is required.*

-----

## 👥 Development Team

**Group: Sovereign**

| Name | Role | Responsibilities |
| :--- | :--- | :--- |
| **Baligat, Jenna Alyssa Q.** | **Project Leader** | Lead Developer (UI/UX), Self-Assessment Module Architecture |
| **Habitan, Mark Eugenio T.** | **Lead Programmer** | Forum Logic, Chatbot Algorithm Implementation |
| **Aquino, Ram B.** | **Developer** | Data Structures Integration, Logic Optimization |
| **Monares, Carl Dave C.** | **Developer** | Knowledge Base Compilation, Testing |
| **Casison, Rhod Stephen S.** | **Developer** | Content Modules, Educational Resources |

-----

## 📄 License

This project is submitted for **CC105 - Data Structures and Algorithms** and is available for educational purposes.
