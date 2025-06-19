export function DarkMode() {
    document.documentElement.style.setProperty("--primary-color", "#222");
    document.documentElement.style.setProperty("--text-color", "#e5e5e5");
    document.documentElement.style.setProperty("--solid-color", "#333");
    document.documentElement.style.setProperty("--form-input-color", "#444");
    document.documentElement.style.setProperty(
        "--primary-alpha-color",
        "#1d1d1d66"
    );
}
export function LightMode() {
    document.documentElement.style.setProperty("--primary-color", "#E4E5F1");
    document.documentElement.style.setProperty("--text-color", "#000");
    document.documentElement.style.setProperty("--solid-color", "#fff");
    document.documentElement.style.setProperty("--form-input-color", "#e7e7e7");
    document.documentElement.style.setProperty(
        "--primary-alpha-color",
        "#d0d0d042"
    );
}

