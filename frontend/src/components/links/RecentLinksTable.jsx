import Card from "../ui/Card";

function RecentLinksTable({ links }) {

    return (

        <Card>

            <h2 className="text-xl font-semibold mb-5">

                Recent Links

            </h2>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="text-left py-3">
                            Short URL
                        </th>

                        <th className="text-left">
                            Long URL
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {links.map((link) => (

                        <tr
                            key={link.id}
                            className="border-b"
                        >

                            <td className="py-4">

                                {link.short_code}

                            </td>

                            <td>

                                {link.long_url}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </Card>

    );

}

export default RecentLinksTable;