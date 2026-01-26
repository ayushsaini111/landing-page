// /src/app/services/layout.js
import GetInTouch from '@/components/GetInTouch';

// Server layout for /services/* routes. Keeps the CTA persistent below service content.
export default function ServicesLayout({ children }) {
    return (
        <div>
            {/* Primary service content (server-rendered) */}
            <main role="main">
                {children}
            </main>

            {/* Persistent CTA – placed in an aside for clearer semantics and accessibility */}
            <aside aria-label="contact call to action" className="bg-transparent">
                <div className="max-w-7xl mx-auto px-s16 md:px-s32 py-[100px] md:py-[200px]">
                    <GetInTouch
                        variant="blue"
                        height="470px"
                        title="Need guidance?"
                        subtitle={
                            "If you're dealing with an issue related to this service, feel free to reach out. We'll explain your options clearly and guide you through the right next steps."
                        }
                    />
                </div>
            </aside>
        </div>
    );
}
