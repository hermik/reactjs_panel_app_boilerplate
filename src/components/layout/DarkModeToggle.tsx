import { useAppLayoutStore } from '../../stores/layoutStore'

export default function DarkModeToggle() {
    const toggleDarkMode = useAppLayoutStore((state) => state.toggleDarkMode)
    return (
        <button className="darkmode-toggle" onClick={toggleDarkMode}>
            Toggle Darkmode
        </button>
    );
}