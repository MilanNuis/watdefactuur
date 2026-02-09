import Header from "@/Components/Pro/Header";
import ProLayout from "@/Layouts/ProLayout";
import { User } from "@/types";
import UpdatePasswordForm from "./Components/UpdatePasswordForm";
import UpdateEmailForm from "./Components/UpdateEmailForm";
import SubscriptionManagement from "./Components/SubscriptionManagement";

interface Props {
    user: User;
    status?: string;
}

export default function AccountIndex({ user, status }: Props) {
    return (
        <ProLayout>
            <Header
                title="Mijn Account"
                description="Beheer hier je accountgegevens en subscription"
            />

            <div className="py-8 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <UpdateEmailForm user={user} />
                    <UpdatePasswordForm />
                </div>

                <SubscriptionManagement user={user} />
            </div>
        </ProLayout>
    );
}
