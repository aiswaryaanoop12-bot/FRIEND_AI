async function generateText() {

    const promptBox = document.getElementById("prompt");
    const prompt = promptBox.value.trim();

    if (!prompt) return;

    const chatBox = document.getElementById("chat-box");

    const userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.innerText = prompt;

    chatBox.appendChild(userMessage);

    promptBox.value = "";
    updateCounter();

    const aiContainer = document.createElement("div");
    aiContainer.className = "ai-container";

    const aiMessage = document.createElement("div");
    aiMessage.className = "ai-message";
    aiMessage.innerText = "🌌 Thinking...";

    aiContainer.appendChild(aiMessage);

    chatBox.appendChild(aiContainer);

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        const response = await fetch("/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: prompt
            })
        });

        const data = await response.json();

        aiMessage.innerText = data.data;

        const copyButton = document.createElement("button");
        copyButton.className = "copy-btn";
        copyButton.innerText = "📋 Copy";

        copyButton.onclick = function () {

            navigator.clipboard.writeText(data.data);

            copyButton.innerText = "✅ Copied";

            setTimeout(() => {
                copyButton.innerText = "📋 Copy";
            }, 2000);
        };

        aiContainer.appendChild(copyButton);

    } catch (error) {

        aiMessage.innerText =
            "❌ Error generating response.";

        console.error(error);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

function clearChat() {

    const chatBox = document.getElementById("chat-box");

    chatBox.innerHTML = "";

    const welcomeContainer =
        document.createElement("div");

    welcomeContainer.className =
        "ai-container";

    const welcomeMessage =
        document.createElement("div");

    welcomeMessage.className =
        "ai-message";

    welcomeMessage.innerHTML =
        "🌌 Welcome to Cosmic Black Hole AI!<br><br>" +
        "🚀 Ask me anything about Python, AI, Coding, GATE, Data Analytics, or any topic.";

    welcomeContainer.appendChild(
        welcomeMessage
    );

    chatBox.appendChild(
        welcomeContainer
    );
}

function updateCounter() {

    const text =
        document.getElementById("prompt").value;

    document.getElementById("counter").innerText =
        text.length + " Characters";
}

document.addEventListener("DOMContentLoaded", function () {

    const chatBox =
        document.getElementById("chat-box");

    const welcomeContainer =
        document.createElement("div");

    welcomeContainer.className =
        "ai-container";

    const welcomeMessage =
        document.createElement("div");

    welcomeMessage.className =
        "ai-message";

    welcomeMessage.innerHTML =
        "🌌 Welcome to FRIEND AI!<br><br>" +
        "🚀 Ask me anything about Python, AI, Coding, GATE, Data Analytics, or any topic.";

    welcomeContainer.appendChild(
        welcomeMessage
    );

    chatBox.appendChild(
        welcomeContainer
    );

    const promptBox =
        document.getElementById("prompt");

    promptBox.addEventListener(
        "input",
        updateCounter
    );

    promptBox.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                generateText();
            }
        }
    );

    updateCounter();
});
function toggleTheme(){

    document.body.classList.toggle(
        "light-mode"
    );

    const btn =
        document.getElementById("themeBtn");

    if(
        document.body.classList.contains(
            "light-mode"
        )
    ){
        btn.innerText = "☀️";
    }
    else{
        btn.innerText = "🌙";
    }
}