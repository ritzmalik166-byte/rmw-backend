// import { NextRequest, NextResponse } from "next/server";
// import { getDBPool } from "@/lib/db";
// import { ResultSetHeader } from "mysql2";

// // GET /api/faqs/:id
// export async function GET({ params }: { params: { id: string } }) {
//   const { id } = params;
//   try {
//     const query = "SELECT * FROM faqs WHERE id = ?";
//     const [rows] = await getDBPool().execute(query, [id]);
//     if ((rows as any[]).length === 0) {
//       return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
//     }
//     return NextResponse.json((rows as any[])[0]);
//   } catch (error) {
//     console.error("Error fetching FAQ by ID:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// // PUT /api/faqs/:id
// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = await params;
//   try {
//     const { title, description, status } = await req.json();

//     if (!title || !description || !status) {
//       return NextResponse.json(
//         { error: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     const query =
//       "UPDATE faqs SET title = ?, description = ?, status = ?, updated_at = NOW() WHERE id = ?";
//     const [result] = await getDBPool().execute(query, [
//       title,
//       description,
//       status,
//       id,
//     ]);

//     if ((result as ResultSetHeader).affectedRows === 0) {
//       return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
//     }

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error updating FAQ:", error);
//     return NextResponse.json(
//       { error: "Failed to update FAQ" },
//       { status: 500 }
//     );
//   }
// }

// // DELETE /api/faqs/:id
// export async function DELETE({ params }: { params: { id: string } }) {
//   const { id } = params;
//   try {
//     const query = "DELETE FROM faqs WHERE id = ?";
//     const [result] = await getDBPool().execute(query, [id]);

//     if ((result as ResultSetHeader).affectedRows === 0) {
//       return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
//     }

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error deleting FAQ:", error);
//     return NextResponse.json(
//       { error: "Failed to delete FAQ" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";
import { ResultSetHeader } from "mysql2";

interface Faq {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

// GET /api/faqs/:id
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const query = "SELECT * FROM faqs WHERE id = ?";
    const [rows] = await getDBPool().execute(query, [id]);
    const faqs = rows as Faq[];
    if (faqs.length === 0) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }
    return NextResponse.json(faqs[0]);
  } catch (error) {
    console.error("Error fetching FAQ by ID:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT /api/faqs/:id
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const { title, description, status } = await req.json();

    if (!title || !description || !status) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const query =
      "UPDATE faqs SET title = ?, description = ?, status = ?, updated_at = NOW() WHERE id = ?";
    const [result] = await getDBPool().execute(query, [
      title,
      description,
      status,
      id,
    ]);

    if ((result as ResultSetHeader).affectedRows === 0) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    return NextResponse.json(
      { error: "Failed to update FAQ" },
      { status: 500 }
    );
  }
}

// DELETE /api/faqs/:id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const query = "DELETE FROM faqs WHERE id = ?";
    const [result] = await getDBPool().execute(query, [id]);

    if ((result as ResultSetHeader).affectedRows === 0) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    return NextResponse.json(
      { error: "Failed to delete FAQ" },
      { status: 500 }
    );
  }
}
