import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './globals.css';

export const metadata = {
    title: 'MusicSNS',
    description: 'Generated by create next app',
    name: "viewport",
    content: "initial-scale=1, width=device-width",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
                <body>
                    {children}
                </body>
        </html>
    );
}