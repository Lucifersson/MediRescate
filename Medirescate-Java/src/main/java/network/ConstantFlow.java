package network;

import util.AnsiColors;

public class ConstantFlow implements Runnable{
    private int silent;
    private int totalPayload;
    private int minDelay;
    private int maxDelay;
    private int server;

    public ConstantFlow(int silent, int totalPayload, int minDelay, int maxDelay, int server) {
        this.maxDelay = maxDelay;
        this.minDelay = minDelay;
        this.totalPayload = totalPayload;
        this.silent=silent;
        this.server = server;
    }


    @Override
    public void run() {
        System.out.println(AnsiColors.PURPLE_BRIGHT+"[Constant Flow]"+AnsiColors.RESET+" Comenzando prueba de carga");
        for (int i=0;i<totalPayload;i++){
            switch ((int) (Math.random() * 5)) {
                case 0 -> new Thread(new FakeClient(100, silent, server)).start();
                case 1 -> new Thread(new FakeClient(101, silent, server)).start();
                case 2 -> new Thread(new FakeClient(1, silent, server)).start();
                case 3 -> new Thread(new FakeClient(2, silent, server)).start();
                case 4 -> new Thread(new FakeClient(5, silent, server)).start();
            }
            try {
                Thread.sleep((int)(Math.random()*(maxDelay-minDelay))+minDelay);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }

        }

        System.out.println(AnsiColors.PURPLE_BRIGHT+"[Constant Flow]"+AnsiColors.RESET+" Prueba de carga finalizada");
    }
}
