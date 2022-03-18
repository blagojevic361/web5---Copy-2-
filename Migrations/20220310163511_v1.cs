using Microsoft.EntityFrameworkCore.Migrations;

namespace web5.Migrations
{
    public partial class v1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Advokat",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BrojKomore = table.Column<int>(type: "int", nullable: true),
                    AdresaKancelarije = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Zvanje = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Advokat", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Slucaj",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Organizacija = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    JavniTuzitelj = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PrvaSednica = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    KlasaVaznosti = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Slucaj", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sudija",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Iskustvo = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sudija", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Spoj",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Klijent = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SlucajId = table.Column<int>(type: "int", nullable: true),
                    AdvokatId = table.Column<int>(type: "int", nullable: true),
                    Sudijaid = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spoj", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Spoj_Advokat_AdvokatId",
                        column: x => x.AdvokatId,
                        principalTable: "Advokat",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Spoj_Slucaj_SlucajId",
                        column: x => x.SlucajId,
                        principalTable: "Slucaj",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Spoj_Sudija_Sudijaid",
                        column: x => x.Sudijaid,
                        principalTable: "Sudija",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Spoj_AdvokatId",
                table: "Spoj",
                column: "AdvokatId");

            migrationBuilder.CreateIndex(
                name: "IX_Spoj_SlucajId",
                table: "Spoj",
                column: "SlucajId");

            migrationBuilder.CreateIndex(
                name: "IX_Spoj_Sudijaid",
                table: "Spoj",
                column: "Sudijaid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Spoj");

            migrationBuilder.DropTable(
                name: "Advokat");

            migrationBuilder.DropTable(
                name: "Slucaj");

            migrationBuilder.DropTable(
                name: "Sudija");
        }
    }
}
