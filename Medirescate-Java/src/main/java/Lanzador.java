import java.io.File;
import java.io.IOException;
import java.util.Scanner;
import java.util.concurrent.TimeUnit;

public class Lanzador {

    private static Process mainServerProcess;
    private static Process secServerProcess;

    private static boolean mainServerUp = false;
    private static boolean secServerUp = false;
    private static boolean salir = false;

    public static void main(String[] args) throws Exception {
        while (!salir) {
            printMenu();
            selectOption();
        }
    }

    /* =========================
       MENÚ
       ========================= */

    private static void printMenu() {
        String disabled = "\u001B[9m";
        String reset    = AnsiColors.RESET;


        System.out.print(
                "Estado del servidor principal: " +
                        (mainServerUp
                                ? AnsiColors.GREEN_BRIGHT + "encendido"
                                : AnsiColors.RED_BRIGHT + "detenido") +
                        reset + "\n" +

                        "Estado del servidor secundario: " +
                        (secServerUp
                                ? AnsiColors.GREEN_BRIGHT + "encendido"
                                : AnsiColors.RED_BRIGHT + "detenido") +
                        reset + "\n" +

                        AnsiColors.CYAN_BRIGHT +
                        "╔══════════════════════════════════════════════╗\n" +
                        "║                                              ║\n" +
                        "║       " + AnsiColors.PURPLE_BRIGHT + "🖧  MENÚ PRINCIPAL – MAIN SERVER" + AnsiColors.CYAN_BRIGHT + "       ║\n" +
                        "║                                              ║\n" +
                        "╠══════════════════════════════════════════════╣\n" +
                        "║                                              ║\n" +

                        "╠══ " + (!mainServerUp ? disabled : "") + AnsiColors.PURPLE +
                        "1) Lanzar FakeClient" + reset + AnsiColors.CYAN_BRIGHT + "                       ║\n" +

                        "╠══ " + (!mainServerUp ? disabled : "") + AnsiColors.PURPLE +
                        "2) Lanzar prueba de carga" + reset + AnsiColors.CYAN_BRIGHT + "                  ║\n" +

                        "╠══ " +(mainServerUp ? disabled : "")+ AnsiColors.GREEN_BRIGHT +
                        "3) Encender servidores"+ reset + AnsiColors.CYAN_BRIGHT + "                     ║\n" +

                        "╠══ " + (!mainServerUp ? disabled : "") + AnsiColors.RED_BRIGHT +
                        "4) Apagar servidores" + reset + AnsiColors.CYAN_BRIGHT + "                       ║\n" +

                        "╠══ " + (!mainServerUp ? disabled : "") + AnsiColors.RED +
                        "5) Reset servidores" + reset + AnsiColors.CYAN_BRIGHT + "                        ║\n" +

                        "╠══ " + AnsiColors.YELLOW +
                        "6) Salir" + AnsiColors.CYAN_BRIGHT + "                                   ║\n" +

                        "╠══ " + AnsiColors.BLUE +
                        "7) Terminales" + AnsiColors.CYAN_BRIGHT + "                                   ║\n" +

                        "║                                              ║\n" +
                        "╠══════════════════════════════════════════════╣\n" +
                        "║                                              ║\n" +
                        "║   " + AnsiColors.YELLOW_BRIGHT +
                        "Selecciona una opción y pulsa ENTER" +
                        AnsiColors.CYAN_BRIGHT + "        ║\n" +
                        "║                                              ║\n" +
                        "╠══════════════════════════════════════════════╝\n" +
                        AnsiColors.YELLOW_BRIGHT + "╚═══ >> " + reset
        );



    }
    private static void selectOption() throws Exception {
        Scanner sc = new Scanner(System.in);
        String option = sc.nextLine();

        switch (option) {
            case "1" -> launchFakeClient();
            case "2" -> launchConstantFlow();
            case "3" -> startServers();
            case "4" -> stopServers();
            case "5" -> resetServers();
            case "6" -> exit();
            case "7" -> openTerminals();
            default -> System.out.println("Opción no válida");
        }
    }

    /* =========================
       SERVIDORES
       ========================= */

    private static void startServers() throws IOException {
        if (!mainServerUp) {
            launchMainServer();

        }
        if (!secServerUp) {
            launchSecServer();
        }
    }

    private static void openTerminals() {
        openLogTail("logs/mainserver.log", "MainServer LOG");
        openLogTail("logs/secserver.log", "SecondaryServer LOG");
    }

    private static void stopServers() throws InterruptedException {
        stopMainServer();
        stopSecServer();
    }

    private static void resetServers() throws Exception {
        stopServers();
        Thread.sleep(1000);
        startServers();
    }

    private static void exit() throws InterruptedException {
        stopServers();
        salir = true;
    }

    /* =========================
       LANZADO DE SERVIDORES
       ========================= */

    private static void launchMainServer() throws IOException {
        String command = buildJavaCommand("MainServer");

        mainServerProcess = launchWithLogs(
                command,
                "logs/mainserver.log",
                "logs/mainserver.err"
        );

        mainServerUp = true;
        System.out.println("Servidor principal arrancado");
    }

    private static void launchSecServer() throws IOException {
        String command = buildJavaCommand("SecondaryServer");

        secServerProcess = launchWithLogs(
                command,
                "logs/secserver.log",
                "logs/secserver.err"
        );

        secServerUp = true;
        System.out.println("Servidor secundario arrancado");
    }

    private static void stopMainServer() throws InterruptedException {
//        stopProcess(mainServerProcess, "Servidor principal");
        Thread t = new Thread(new FakeClient(-1, 1, 1));
        t.join();
        t.start();
        mainServerProcess = null;
        mainServerUp = false;
    }

    private static void stopSecServer() throws InterruptedException {
//        stopProcess(secServerProcess, "Servidor secundario");
        Thread t = new Thread(new FakeClient(-1, 1, 2));
        t.start();
        t.join();

        secServerProcess = null;
        secServerUp = false;
    }

    /* =========================
       UTILIDADES
       ========================= */

    private static Process launchWithLogs(String command, String outLog, String errLog)
            throws IOException {

        File logsDir = new File("logs");
        if (!logsDir.exists()) logsDir.mkdirs();

        return new ProcessBuilder("sh", "-c", "exec " + command)
                .redirectOutput(new File(outLog))
                .redirectError(new File(errLog))
                .start();
    }

//    private static void stopProcess(Process process, String name) {
//        if (process == null || !process.isAlive()) return;
//
//        process.destroy();
//        try {
//            if (!process.waitFor(3, TimeUnit.SECONDS)) {
//                process.destroyForcibly();
//            }
//            System.out.println(name + " detenido");
//        } catch (InterruptedException e) {
//            process.destroyForcibly();
//            Thread.currentThread().interrupt();
//        }
//    }

    private static String buildJavaCommand(String mainClass) {
        String userHome = System.getProperty("user.home");

        String classpath =
                "target/classes:" +
                        userHome + "/.m2/repository/com/google/code/gson/gson/2.10.1/gson-2.10.1.jar:" +
                        userHome + "/.m2/repository/com/mysql/mysql-connector-j/8.0.33/mysql-connector-j-8.0.33.jar:" +
                        userHome + "/.m2/repository/com/google/protobuf/protobuf-java/3.21.9/protobuf-java-3.21.9.jar";

        return "java -cp \"" + classpath + "\" " + mainClass;
    }

    /* =========================
       CLIENTES
       ========================= */

    private static void launchFakeClient() throws Exception {
        if (!mainServerUp) {
            System.out.println("El servidor no está encendido");
            return;
        }

        Thread t = new Thread(new FakeClient(1, 1, 1));
        t.start();
        t.join();
    }

    private static void launchConstantFlow() {
        if (!mainServerUp) {
            System.out.println("El servidor no está encendido");
            return;
        }

        new Thread(new ConstantFlow(1, 10, 500, 1500, 1)).start();
    }

    private static void openLogTail(String logFile, String title) {
        String[] terminals = {
                "kitty -e",
                // GNOME / GTK
                "gnome-terminal --",
                "kgx --",                 // GNOME Console (nuevo en GNOME)
                "tilix -e",
                "guake -e",
                "tilda -c",

                // KDE
                "konsole -e",
                "yakuake -e",

                // XFCE / LXQt / ligeros
                "xfce4-terminal -e",
                "lxterminal -e",
                "qterminal -e",
                "mate-terminal -e",

                // Genéricas / clásicas
                "alacritty -e",
                "terminator -e",
                "urxvt -e",
                "rxvt -e",

                // Muy básicas / casi siempre presentes
                "xterm -e",
                "eterm -e"
        };


        for (String term : terminals) {
            try {
                new ProcessBuilder(
                        "sh", "-c",
                        term + " sh -c \"tail -f " + logFile + "\""
                ).start();
                break; // si funciona, salimos
            } catch (IOException ignored) {}
        }
    }

}
