// // /api/system-settings/media-banner/[id]/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { writeFile } from "fs/promises";
// import path from "path";
// import { getDBPool } from "@/lib/db";

// // GET a media banner by ID
// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const id = await params.id;
//     const db = getDBPool();

//     const [rows] = await db.execute(
//       "SELECT id, title, image, status, created_at FROM media_banner WHERE id = ?",
//       [id]
//     );

//     if (Array.isArray(rows) && rows.length > 0) {
//       return NextResponse.json(rows[0], { status: 200 });
//     } else {
//       return NextResponse.json(
//         { error: "Media banner not found" },
//         { status: 404 }
//       );
//     }
//   } catch (error) {
//     console.error("Error fetching media banner by ID:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch media banner" },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(req: NextRequest) {
//   try {
//     const formData = await req.formData();

//     const id = formData.get("id") as string;
//     const title = formData.get("title") as string;
//     const status = formData.get("status") as "active" | "inactive";
//     const imageFile = formData.get("image") as File | null;

//     if (!id || !title || !status) {
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//     }

//     const pool = getDBPool();
//     let updateQuery = "UPDATE media_banner SET title=?, status=?";
//     const values: any[] = [title, status];

//     // If image is uploaded
//     if (imageFile) {
//       const bytes = await imageFile.arrayBuffer();
//       const buffer = Buffer.from(bytes);
//       const fileName = `${Date.now()}_${imageFile.name}`;
//       const uploadPath = path.join(
//         process.cwd(),
//         "public/media-banners",
//         fileName
//       );
//       await writeFile(uploadPath, buffer);
//       updateQuery += ", image=?";
//       values.push(fileName);
//     }

//     updateQuery += " WHERE id=?";
//     values.push(id);

//     await pool.execute(updateQuery, values);

//     return NextResponse.json(
//       { message: "Media banner updated." },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating media banner:", error);
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = await params;

//     if (!id) {
//       return NextResponse.json({ error: "ID is required" }, { status: 400 });
//     }

//     const pool = getDBPool();
//     await pool.execute("DELETE FROM media_banner WHERE id=?", [id]);

//     return NextResponse.json(
//       { message: "Media banner deleted." },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting media banner:", error);
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

// /api/system-settings/media-banner/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { getDBPool } from "@/lib/db";

// GET a media banner by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const db = getDBPool();

    const [rows] = await db.execute(
      "SELECT id, title, image, status, created_at FROM media_banner WHERE id = ?",
      [id]
    );

    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json(rows[0], { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Media banner not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching media banner by ID:", error);
    return NextResponse.json(
      { error: "Failed to fetch media banner" },
      { status: 500 }
    );
  }
}

// PUT - update a media banner
export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();

    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const status = formData.get("status") as "active" | "inactive";
    const imageFile = formData.get("image") as File | null;

    if (!id || !title || !status) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const pool = getDBPool();
    let updateQuery = "UPDATE media_banner SET title=?, status=?";
    // const values: any[] = [title, status];
    const values: (string | undefined)[] = [title, status];

    // If image is uploaded
    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}_${imageFile.name}`;

      const dirPath = path.join(process.cwd(), "public/media-banners");
      if (!existsSync(dirPath)) {
        await mkdir(dirPath, { recursive: true });
      }

      const uploadPath = path.join(dirPath, fileName);
      await writeFile(uploadPath, buffer);

      updateQuery += ", image=?";
      values.push(fileName);
    }

    updateQuery += " WHERE id=?";
    values.push(id);

    await pool.execute(updateQuery, values);

    return NextResponse.json(
      { message: "Media banner updated." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating media banner:", error);
    return NextResponse.json(
      { error: "Failed to update media banner" },
      { status: 500 }
    );
  }
}

// DELETE - remove a media banner by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const pool = getDBPool();
    await pool.execute("DELETE FROM media_banner WHERE id=?", [id]);

    return NextResponse.json(
      { message: "Media banner deleted." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting media banner:", error);
    return NextResponse.json(
      { error: "Failed to delete media banner" },
      { status: 500 }
    );
  }
}
