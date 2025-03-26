import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-gray-100 p-4">
            <Card className="w-full max-w-md shadow-lg rounded-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-rose-600">Access Denied</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <div className="mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-24 w-24 mx-auto text-rose-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                            />
                        </svg>
                    </div>
                    <p className="text-lg mb-4">You don't have permission to access this page.</p>
                    <p className="text-gray-600">Please contact your administrator if you believe this is an error.</p>
                </CardContent>
                <CardFooter className="flex justify-center space-x-4">
                    <Button
                        onClick={() => navigate("/")}
                        variant="outline"
                        className="border-rose-500 text-rose-500 hover:bg-rose-50"
                    >
                        Go to Home
                    </Button>
                    <Button
                        onClick={() => navigate(-1)}
                        className="bg-rose-500 hover:bg-rose-600"
                    >
                        Go Back
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}