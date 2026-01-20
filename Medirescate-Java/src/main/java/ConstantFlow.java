public class ConstantFlow implements Runnable{
    private int silent;
    private int totalPayload;
    private int minDelay;
    private int maxDelay;

    public ConstantFlow(int silent, int totalPayload, int minDelay, int maxDelay) {
        this.maxDelay = maxDelay;
        this.minDelay = minDelay;
        this.totalPayload = totalPayload;
        this.silent=silent;
    }


    @Override
    public void run() {
        System.out.println("Comenzando prueba de carga");
        for (int i=0;i<totalPayload;i++){
            switch ((int) (Math.random() * 3)) {
                case 0 -> new Thread(new FakeClient(100, silent)).start();
                case 1 -> new Thread(new FakeClient(101, silent)).start();
                case 2 -> new Thread(new FakeClient(1, silent)).start();
            }
            try {
                Thread.sleep((int)(Math.random()*(maxDelay-minDelay))+minDelay);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }

        }

        System.out.println("Prueba de carga finalizada");
    }
}
