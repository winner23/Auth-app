import { Card } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { AuthLogin, AuthRegister } from "@/components/layout/auth";

import styles from "./Auth.module.css";

export function Auth() {
  return (
    <div className={styles.wrapper}>
      <h1>Authentication</h1>
      <Tabs defaultValue="login" className={styles.tabs}>
        <TabsList className={styles.tabList}>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <AuthLogin />
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <AuthRegister />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
