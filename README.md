# GroupSovereign-sdg3-dsa
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

---

## ⚙️ Data Structures & Algorithms (DSA) Implementation
This project utilizes core DSA concepts to ensure efficient data retrieval and logical flow:

### 1. Hash Maps (Dictionaries) — *Chatbot Module*
* **Application:** The `knowledgeBase` object acts as a Hash Map.
* **Logic:** User queries are tokenized and mapped against keys in the object.
* **Complexity:** Average lookup time is **O(1)**, allowing for instant responses to keywords like "contraception" or "clinics" without iterating through every possible answer.

### 2. Decision Trees — *Self-Assessment Module*
* **Application:** The "Contraception Finder", "STI Risk Check", "Consent Check-In" use a nested object structure representing a Decision Tree.
* **Logic:** The algorithm traverses nodes (`start` -> `yes/no` -> `next_node`) until a leaf node (Result) is reached.
* **Complexity:** **O(log N)** where N is the depth of the questions. This is the most efficient way to filter user needs based on binary choices.

### 3. Queue / Array List — *Community Forum*
* **Application:** The Forum posts are stored in an Array acting as a List/Queue.
* **Logic:** New posts are unshifted to the front (LIFO/Stack behavior for display) or sorted based on "Likes" using a sorting algorithm.
* **Persistence:** Data is serialized to JSON and stored in LocalStorage to simulate a database.

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
