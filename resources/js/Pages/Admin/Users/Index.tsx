import Header from "@/Components/Pro/Header";
import Adminlayout from "@/Layouts/AdminLayout";
import { usePage, useForm, router } from "@inertiajs/react";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/Components/ui/dialog";
import { Badge } from "@/Components/ui/Badge";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Checkbox } from "@/Components/ui/checkbox";
import Paginator from "@/Components/Paginator";
import { Edit, Plus, Trash2, ShieldCheck, ShieldAlert } from "lucide-react";
import { User } from "@/types";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/Components/ui/alert-dialog";

interface UsersProps {
    users: {
        data: User[];
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
    };
}

export default function Index() {
    const { users } = usePage().props as unknown as UsersProps;
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const createForm = useForm({
        name: "",
        email: "",
        password: "",
        is_pro: false,
        is_admin: false,
    });

    const editForm = useForm({
        name: "",
        email: "",
        password: "",
        is_pro: false,
        is_admin: false,
    });

    const handleCreateUser = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post(route("admin.users.store"), {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                createForm.reset();
            },
        });
    };

    const handleEditUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;
        editForm.patch(route("admin.users.update", selectedUser.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                editForm.reset();
            },
        });
    };

    const openEditModal = (user: User) => {
        setSelectedUser(user);
        editForm.setData({
            name: user.name,
            email: user.email,
            password: "",
            is_pro: user.is_pro,
            is_admin: user.is_admin,
        });
        setIsEditModalOpen(true);
    };

    const togglePro = (user: User) => {
        router.patch(
            route("admin.users.toggle-pro", user.id),
            {},
            {
                preserveScroll: true,
            },
        );
    };

    const deleteUser = (user: User) => {
        router.delete(route("admin.users.destroy", user.id), {
            preserveScroll: true,
            onSuccess: () => {
                setIsDeleteDialogOpen(false);
                setSelectedUser(null);
            },
        });
    };

    return (
        <Adminlayout>
            <div className="mb-6 flex items-center justify-between">
                <Header title="Gebruikers" description="Beheer hier je gebruikers" />
                <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="gap-2 bg-[--main-green] text-white"
                    variant={"home"}
                >
                    <Plus className="h-4 w-4" />
                    Gebruiker toevoegen
                </Button>
            </div>

            <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Naam</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Aangemaakt op</TableHead>
                            <TableHead className="text-right">Acties</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                                    Geen gebruikers gevonden.
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.data.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {user.is_pro ? (
                                                <Badge
                                                    className="border-green-200 bg-green-100 text-green-800"
                                                    variant={"home"}
                                                >
                                                    Pro
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline">Gratis</Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {/* @ts-ignore - created_at exists on model */}
                                        {new Date(user.created_at).toLocaleDateString("nl-NL")}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => togglePro(user)}
                                                title={user.is_pro ? "Maak Gratis" : "Maak Pro"}
                                            >
                                                {user.is_pro ? (
                                                    <ShieldAlert className="h-4 w-4 text-orange-500" />
                                                ) : (
                                                    <ShieldCheck className="h-4 w-4 text-green-500" />
                                                )}
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => openEditModal(user)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setIsDeleteDialogOpen(true);
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                            <AlertDialog
                                                open={isDeleteDialogOpen && selectedUser?.id === user.id}
                                                onOpenChange={setIsDeleteDialogOpen}
                                            >
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Gebruiker verwijderen</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Weet je zeker dat je deze gebruiker wilt verwijderen?
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Annuleren</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                            onClick={() => deleteUser(user)}
                                                        >
                                                            Verwijderen
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-4">
                <Paginator data={users} />
            </div>

            {/* Create User Modal */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nieuwe gebruiker toevoegen</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCreateUser} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Naam</Label>
                            <Input
                                id="name"
                                value={createForm.data.name}
                                onChange={(e) => createForm.setData("name", e.target.value)}
                                required
                            />
                            {createForm.errors.name && (
                                <p className="text-sm text-destructive">{createForm.errors.name}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={createForm.data.email}
                                onChange={(e) => createForm.setData("email", e.target.value)}
                                required
                            />
                            {createForm.errors.email && (
                                <p className="text-sm text-destructive">{createForm.errors.email}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Wachtwoord</Label>
                            <Input
                                id="password"
                                type="password"
                                value={createForm.data.password}
                                onChange={(e) => createForm.setData("password", e.target.value)}
                                required
                            />
                            {createForm.errors.password && (
                                <p className="text-sm text-destructive">{createForm.errors.password}</p>
                            )}
                        </div>
                        <div className="flex items-center gap-2 space-x-2">
                            <Checkbox
                                id="is_pro"
                                checked={createForm.data.is_pro}
                                onCheckedChange={(checked) => createForm.setData("is_pro", !!checked)}
                            />
                            <Label htmlFor="is_pro">Geef Pro status</Label>
                        </div>
                        <div className="flex items-center gap-2 space-x-2">
                            <Checkbox
                                id="is_admin"
                                checked={createForm.data.is_admin}
                                onCheckedChange={(checked) => createForm.setData("is_admin", !!checked)}
                            />
                            <Label htmlFor="is_admin">Geef Admin status</Label>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                                Annuleren
                            </Button>
                            <Button type="submit" disabled={createForm.processing}>
                                Gebruiker aanmaken
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit User Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Gebruiker bewerken</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleEditUser} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-name">Naam</Label>
                            <Input
                                id="edit-name"
                                value={editForm.data.name}
                                onChange={(e) => editForm.setData("name", e.target.value)}
                                required
                            />
                            {editForm.errors.name && <p className="text-sm text-destructive">{editForm.errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-email">Email</Label>
                            <Input
                                id="edit-email"
                                type="email"
                                value={editForm.data.email}
                                onChange={(e) => editForm.setData("email", e.target.value)}
                                required
                            />
                            {editForm.errors.email && (
                                <p className="text-sm text-destructive">{editForm.errors.email}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-password">Wachtwoord (leeg laten om niet te wijzigen)</Label>
                            <Input
                                id="edit-password"
                                type="password"
                                value={editForm.data.password}
                                onChange={(e) => editForm.setData("password", e.target.value)}
                            />
                            {editForm.errors.password && (
                                <p className="text-sm text-destructive">{editForm.errors.password}</p>
                            )}
                        </div>
                        <div className="flex items-center gap-2 space-x-2">
                            <Checkbox
                                id="edit-is_pro"
                                checked={editForm.data.is_pro}
                                onCheckedChange={(checked) => editForm.setData("is_pro", !!checked)}
                            />
                            <Label htmlFor="edit-is_pro">Pro status</Label>
                        </div>
                        <div className="flex items-center gap-2 space-x-2">
                            <Checkbox
                                id="edit-is_admin"
                                checked={editForm.data.is_admin}
                                onCheckedChange={(checked) => editForm.setData("is_admin", !!checked)}
                            />
                            <Label htmlFor="edit-is_admin">Admin status</Label>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                                Annuleren
                            </Button>
                            <Button type="submit" disabled={editForm.processing}>
                                Wijzigingen opslaan
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </Adminlayout>
    );
}
