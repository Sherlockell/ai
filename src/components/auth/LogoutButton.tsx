import { motion } from "framer-motion";
import { logout } from "../../lib/stores/authStore";

export default function LogoutButton() {
	return (
		<div className="fixed top-4 right-8 z-50">
			<motion.button
				onClick={logout}
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
			>
				Sign Out
			</motion.button>
		</div>
	);
}
