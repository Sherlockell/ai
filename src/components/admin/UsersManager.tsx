import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import type { Profile } from "../../types/database";

export default function UsersManager() {
	const [users, setUsers] = useState<Profile[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showCreateModal, setShowCreateModal] = useState(false);

	useEffect(() => {
		loadUsers();
	}, []);

	async function loadUsers() {
		try {
			const { data, error } = await supabase
				.from("profiles")
				.select("*")
				.order("created_at", { ascending: false });

			if (error) throw error;
			setUsers(data || []);
		} catch (error) {
			console.error("Error loading users:", error);
		} finally {
			setIsLoading(false);
		}
	}

	async function handleCreateUser(formData: {
		email: string;
		password: string;
		full_name: string;
		role: "admin" | "user";
	}) {
		try {
			// Create auth user
			const { data: authData, error: authError } =
				await supabase.auth.admin.createUser({
					email: formData.email,
					password: formData.password,
					email_confirm: true,
				});

			if (authError) throw authError;

			// Create profile
			const { error: profileError } = await supabase
				.from("profiles")
				.update({
					full_name: formData.full_name,
					role: formData.role,
				})
				.eq("id", authData.user.id);

			if (profileError) throw profileError;

			// Refresh users list
			loadUsers();
			setShowCreateModal(false);
		} catch (error) {
			console.error("Error creating user:", error);
			alert("Error creating user. Please try again.");
		}
	}

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-display font-bold text-white">
					Manage Users
				</h1>
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					onClick={() => setShowCreateModal(true)}
					className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 text-white text-sm font-medium"
				>
					Create User
				</motion.button>
			</div>

			{isLoading ? (
				<div className="text-gray-400">Loading...</div>
			) : (
				<div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
					<table className="w-full">
						<thead>
							<tr className="border-b border-white/10">
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400">
									Name
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400">
									Email
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400">
									Role
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400">
									Created
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-white/10">
							{users.map((user) => (
								<tr key={user.id} className="hover:bg-white/5">
									<td className="px-6 py-4 text-sm text-white">
										{user.full_name}
									</td>
									<td className="px-6 py-4 text-sm text-gray-300">
										{user.email}
									</td>
									<td className="px-6 py-4">
										<span
											className={`px-2 py-1 text-xs font-medium rounded-full ${
												user.role === "admin"
													? "bg-violet-500/10 text-violet-400"
													: "bg-blue-500/10 text-blue-400"
											}`}
										>
											{user.role}
										</span>
									</td>
									<td className="px-6 py-4 text-sm text-gray-300">
										{new Date(user.created_at).toLocaleDateString()}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			{showCreateModal && (
				<CreateUserModal
					onClose={() => setShowCreateModal(false)}
					onCreate={handleCreateUser}
				/>
			)}
		</div>
	);
}

function CreateUserModal({
	onClose,
	onCreate,
}: {
	onClose: () => void;
	onCreate: (data: {
		email: string;
		password: string;
		full_name: string;
		role: "admin" | "user";
	}) => void;
}) {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		full_name: "",
		role: "user" as "admin" | "user",
	});

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 w-full max-w-md"
			>
				<h2 className="text-xl font-display font-bold text-white mb-4">
					Create New User
				</h2>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						onCreate(formData);
					}}
					className="space-y-4"
				>
					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">
							Full Name
						</label>
						<input
							type="text"
							value={formData.full_name}
							onChange={(e) =>
								setFormData({ ...formData, full_name: e.target.value })
							}
							required
							className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">
							Email
						</label>
						<input
							type="email"
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							required
							className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">
							Password
						</label>
						<input
							type="password"
							value={formData.password}
							onChange={(e) =>
								setFormData({ ...formData, password: e.target.value })
							}
							required
							className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">
							Role
						</label>
						<select
							value={formData.role}
							onChange={(e) =>
								setFormData({
									...formData,
									role: e.target.value as "admin" | "user",
								})
							}
							className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white"
						>
							<option value="user">User</option>
							<option value="admin">Admin</option>
						</select>
					</div>

					<div className="flex justify-end gap-4 mt-6">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 rounded-lg border border-white/10 text-white text-sm font-medium hover:bg-white/5"
						>
							Cancel
						</button>
						<motion.button
							type="submit"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 text-white text-sm font-medium"
						>
							Create User
						</motion.button>
					</div>
				</form>
			</motion.div>
		</div>
	);
}
