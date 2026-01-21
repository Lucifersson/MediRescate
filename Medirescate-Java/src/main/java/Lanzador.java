import java.io.File;
import java.io.IOException;
import java.util.Scanner;

public class Lanzador {
    private static Process mainServerProcess;
    private static boolean salir = false;
    private static boolean serverUp = false;

    void main() throws IOException, InterruptedException {
        while (!salir) {
            printMenu();
            Lanzador.selectOption();
        }
    }


    private static void printMenu() {
        String disabled = "\u001B[9m";
        String reset    = AnsiColors.RESET;


        System.out.print(
                "Estado del servidor: " +
                        (serverUp
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

                        "╠══ " + (!serverUp ? disabled : "") + AnsiColors.PURPLE +
                        "1) Lanzar FakeClient" + reset + AnsiColors.CYAN_BRIGHT + "                       ║\n" +

                        "╠══ " + (!serverUp ? disabled : "") + AnsiColors.PURPLE +
                        "2) Lanzar prueba de carga" + reset + AnsiColors.CYAN_BRIGHT + "                  ║\n" +

                        "╠══ " +(serverUp ? disabled : "")+ AnsiColors.GREEN_BRIGHT +
                        "3) Encender servidor"+ reset + AnsiColors.CYAN_BRIGHT + "                       ║\n" +

                        "╠══ " + (!serverUp ? disabled : "") + AnsiColors.RED_BRIGHT +
                        "4) Apagar servidor" + reset + AnsiColors.CYAN_BRIGHT + "                         ║\n" +

                        "╠══ " + (!serverUp ? disabled : "") + AnsiColors.RED +
                        "5) Reset servidor" + reset + AnsiColors.CYAN_BRIGHT + "                          ║\n" +

                        "╠══ " + AnsiColors.YELLOW +
                        "6) Salir" + AnsiColors.CYAN_BRIGHT + "                                   ║\n" +

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

    private static void selectOption() throws IOException, InterruptedException {
        Scanner sc = new Scanner(System.in);
        String option;
        boolean valid;

        do {
            option = sc.nextLine();
            valid = option.matches("[1-6]");

            if (!valid) {
                System.out.print("\033[H\033[2J");
                System.out.flush();
                System.out.println(
                        AnsiColors.RED + "Opción no válida seleccionada" + AnsiColors.RESET
                );
            }

        } while (!valid);

        switch (option) {
            case "1" -> launchFakeClient();
            case "2" -> launchConstantFlow();
            case "3" -> launchMainServer();
            case "4" -> {
                if (serverUp) {
                    stopMainServer();
                } else {
                    System.out.println("El servidor no está encendido");
                }
            }
            case "5" -> {
                if (serverUp) {
                    stopMainServer();
                    launchMainServer();
                    Thread.sleep(1000);
                } else {
                    System.out.println("El servidor no está encendido");
                }
            }
            case "6" -> {
                stopMainServer();
                salir=true;
            }
        }
    }

    private static void launchFakeClient() {

        if (serverUp) {
            Thread thr = new Thread(new FakeClient(1, 1));
            thr.start();

            try {
                thr.join();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        } else {
            System.out.println("Encienda el servidor para hacer un test.");
        }

    }

    private static void launchConstantFlow() {

        if (serverUp) {
            Thread thr = new Thread(new ConstantFlow(1, 10, 500, 1500));
            thr.start();

            try {
                thr.join();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        } else {
            System.out.println("Encienda el servidor para hacer un test.");
        }

    }

    private static void launchMainServer() throws IOException {
        String javaPath = "/home/marcos/.jdks/openjdk-25.0.1/bin/java";

        String classpath =
                "target/classes:" +
                        "/home/marcos/.m2/repository/com/google/code/gson/gson/2.10.1/gson-2.10.1.jar:" +
                        "/home/marcos/.m2/repository/com/mysql/mysql-connector-j/8.0.33/mysql-connector-j-8.0.33.jar:" +
                        "/home/marcos/.m2/repository/com/google/protobuf/protobuf-java/3.21.9/protobuf-java-3.21.9.jar";

        String command = javaPath +
                " -cp \"" + classpath + "\" " +
                "MainServer";

        ProcessBuilder pb = new ProcessBuilder(
                "/usr/bin/kitty",
                "zsh", "-c",
                command + "; read '?Pulsa ENTER para salir...'"
        );

        pb.directory(new File(System.getProperty("user.dir")));

        mainServerProcess = pb.start();
        serverUp = true;
    }

    public static void stopMainServer() {

        if (mainServerProcess == null || !mainServerProcess.isAlive()) {
            return;
        }


        mainServerProcess.destroy();

        try {
            if (!mainServerProcess.waitFor(3, java.util.concurrent.TimeUnit.SECONDS)) {
                mainServerProcess.destroyForcibly();
            }
        } catch (InterruptedException e) {
            mainServerProcess.destroyForcibly();
            Thread.currentThread().interrupt();
        }

        serverUp = false;

    }

}


