import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import CodeBlock from '../components/CodeBlock';
import CalloutBox from '../components/CalloutBox';
import {docContent} from '../data/docContent';

const DocContent = ({docPath}) => {
    const navigate = useNavigate();

    useEffect(() => {
        // If docPath doesn't exist, redirect to the first available doc
        if (!docContent[docPath]) {
            navigate('/docs');
        }
    }, [docPath, navigate]);

    if (!docContent[docPath]) {
        return null;
    }

    const content = docContent[docPath];

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-primary-900 dark:text-white mb-3">
                {content.title}
            </h1>

            {content.updated && (
                <div
                    className="inline-block bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium px-3 py-1 rounded-full mb-6">
                    Last updated - {content.updated}
                </div>
            )}

            {content.introduction && (
                <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
                    {content.introduction}
                </p>
            )}

            {content.sections.map((section, index) => (
                <section key={index} className="mb-12">
                    <h2 className="text-2xl font-bold text-primary-900 dark:text-white mb-4" id={section.id}>
                        {section.title}
                    </h2>

                    {section.content.map((item, itemIndex) => {
                        switch (item.type) {
                            case 'paragraph':
                                return (
                                    <p key={itemIndex} className="text-slate-700 dark:text-slate-300 mb-4">
                                        {item.text}
                                    </p>
                                );
                            case 'code':
                                return (
                                    <CodeBlock key={itemIndex} language={item.language || 'java'} title={item.title}>
                                        {item.code}
                                    </CodeBlock>
                                );
                            case 'callout':
                                return (
                                    <CalloutBox
                                        key={itemIndex}
                                        type={item.calloutType}
                                        title={item.title}
                                        className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-900 p-4 rounded-md shadow-md"
                                    >
                                        {item.text}
                                    </CalloutBox>
                                );
                            case 'list':
                                return item.ordered ? (
                                    <ol key={itemIndex}
                                        className="list-decimal pl-6 mb-6 text-slate-700 dark:text-slate-300 space-y-2">
                                        {item.items.map((listItem, listItemIndex) => (
                                            <li key={listItemIndex}>{listItem}</li>
                                        ))}
                                    </ol>
                                ) : (
                                    <ul key={itemIndex}
                                        className="list-disc pl-6 mb-6 text-slate-700 dark:text-slate-300 space-y-2">
                                        {item.items.map((listItem, listItemIndex) => (
                                            <li key={listItemIndex}>{listItem}</li>
                                        ))}
                                    </ul>
                                );
                            default:
                                return null;
                        }
                    })}
                </section>
            ))}
        </div>
    );
};

export default DocContent;